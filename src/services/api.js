/**
 * GuzoTribe Unified API Service
 * Seamlessly switches between Mock Data Mode and Live NestJS Backend.
 */

import { tripsData as fallbackTrips } from '../data/tripsData';

const BASE_URL = '/api';

let currentMode = (function() {
  try {
    return localStorage.getItem('guzotribe_data_mode') || 'backend';
  } catch {
    return 'backend';
  }
})();

function getToken() {
  try {
    return localStorage.getItem('guzotribe_token');
  } catch {
    return null;
  }
}

async function request(endpoint, options = {}) {
  try {
    const token = getToken();
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...options.headers
      },
      ...options
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `API error ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.warn(`[GuzoTribe API] Request failed for ${endpoint}:`, err.message);
    throw err;
  }
}

// Local storage mock helpers
function getMockBookings() {
  try {
    const stored = localStorage.getItem('guzotribe_mock_bookings');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveMockBookings(bookings) {
  try {
    localStorage.setItem('guzotribe_mock_bookings', JSON.stringify(bookings));
  } catch {}
}

export const api = {
  // Mode Controller
  setMode(mode) {
    currentMode = mode === 'mock' ? 'mock' : 'backend';
  },

  getMode() {
    return currentMode;
  },

  isMock() {
    return currentMode === 'mock';
  },

  // Authentication
  async register(data) {
    if (this.isMock()) {
      const mockUser = {
        id: `usr-mock-${Date.now()}`,
        name: data.name,
        phone: data.phone,
        email: data.email || 'traveler@guzotribe.et',
        role: data.role || 'traveler',
        city: data.city || 'Addis Ababa',
        createdAt: new Date().toISOString()
      };
      const token = `gz_tok_mock_${btoa(mockUser.role)}_${Date.now()}`;
      try {
        localStorage.setItem('guzotribe_token', token);
      } catch {}
      return { token, user: mockUser };
    }

    const res = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    if (res.data?.token) {
      try {
        localStorage.setItem('guzotribe_token', res.data.token);
      } catch {}
    }
    return res.data;
  },

  async login(credentials) {
    if (this.isMock()) {
      const isHost = credentials.identifier?.includes('host') || credentials.identifier?.includes('operator');
      const mockUser = {
        id: isHost ? 'usr-host-001' : 'usr-trav-001',
        name: isHost ? 'Muller Outdoors (Tour Club)' : 'Bethlehem Tadesse',
        phone: credentials.identifier?.startsWith('+') ? credentials.identifier : '+251 911 482910',
        email: credentials.identifier?.includes('@') ? credentials.identifier : 'bethlehem@example.com',
        role: isHost ? 'host' : 'traveler',
        city: 'Addis Ababa',
        createdAt: new Date().toISOString()
      };
      const token = `gz_tok_mock_${btoa(mockUser.role)}_${Date.now()}`;
      try {
        localStorage.setItem('guzotribe_token', token);
      } catch {}
      return { token, user: mockUser };
    }

    const res = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    if (res.data?.token) {
      try {
        localStorage.setItem('guzotribe_token', res.data.token);
      } catch {}
    }
    return res.data;
  },

  async sendOtp(phone) {
    if (this.isMock()) {
      return {
        success: true,
        message: `[MOCK SMS] OTP dispatched to ${phone}. (Code: 8492)`,
        testCode: '8492'
      };
    }

    return await request('/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({ phone })
    });
  },

  async verifyOtp(phone, code) {
    if (this.isMock()) {
      const mockUser = {
        id: 'usr-mock-verified',
        name: 'Amanuel Tadesse (Mock Verified)',
        phone,
        email: 'amanuel@example.com',
        role: 'traveler',
        city: 'Addis Ababa (Bole)',
        createdAt: new Date().toISOString()
      };
      const token = `gz_tok_mock_${btoa(mockUser.role)}_${Date.now()}`;
      try {
        localStorage.setItem('guzotribe_token', token);
      } catch {}
      return { token, user: mockUser };
    }

    const res = await request('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ phone, code })
    });
    if (res.data?.token) {
      try {
        localStorage.setItem('guzotribe_token', res.data.token);
      } catch {}
    }
    return res.data;
  },

  async getMe() {
    if (this.isMock()) {
      return {
        id: 'usr-trav-001',
        name: 'Bethlehem Tadesse',
        phone: '+251 911 482910',
        email: 'bethlehem@example.com',
        role: 'traveler',
        city: 'Addis Ababa'
      };
    }

    const res = await request('/auth/me');
    return res.data;
  },

  logout() {
    try {
      localStorage.removeItem('guzotribe_token');
    } catch {}
  },

  // Trips
  async getTrips(params = {}) {
    if (this.isMock()) {
      let filtered = [...fallbackTrips];
      if (params.search) {
        const q = params.search.toLowerCase();
        filtered = filtered.filter(t => t.title.toLowerCase().includes(q) || t.destination.toLowerCase().includes(q));
      }
      if (params.category && params.category !== 'All') {
        filtered = filtered.filter(t => t.category === params.category);
      }
      if (params.region && params.region !== 'All') {
        filtered = filtered.filter(t => t.region === params.region);
      }
      return filtered;
    }

    try {
      const query = new URLSearchParams(params).toString();
      const res = await request(`/trips${query ? `?${query}` : ''}`);
      return res.data || [];
    } catch {
      return fallbackTrips;
    }
  },

  async getTripById(id) {
    if (this.isMock()) {
      return fallbackTrips.find(t => t.id === id) || fallbackTrips[0];
    }

    try {
      const res = await request(`/trips/${id}`);
      return res.data;
    } catch {
      return fallbackTrips.find(t => t.id === id) || fallbackTrips[0];
    }
  },

  async createTrip(tripData) {
    if (this.isMock()) {
      const newTrip = {
        ...tripData,
        id: `mock-trip-${Date.now()}`,
        occupiedSeats: [],
        availableSeats: 28,
        organizer: 'Muller Outdoors',
        organizerVerified: true,
        createdAt: new Date().toISOString()
      };
      return newTrip;
    }

    const res = await request('/trips', {
      method: 'POST',
      body: JSON.stringify(tripData)
    });
    return res.data;
  },

  // Bookings
  async createBooking(bookingDto) {
    if (this.isMock()) {
      const mockBooking = {
        id: `GZ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        ...bookingDto,
        telebirrTxn: `TLB-MOCK-${Math.floor(100000 + Math.random() * 900000)}`,
        paymentStatus: 'escrow_secured',
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };
      const current = getMockBookings();
      saveMockBookings([mockBooking, ...current]);
      return mockBooking;
    }

    try {
      const res = await request('/bookings', {
        method: 'POST',
        body: JSON.stringify(bookingDto)
      });
      return res.data;
    } catch {
      // Graceful fallback to local mock booking
      const fallbackBooking = {
        id: `GZ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        ...bookingDto,
        telebirrTxn: `TLB-OFFLINE-${Date.now()}`,
        paymentStatus: 'escrow_secured',
        status: 'confirmed'
      };
      return fallbackBooking;
    }
  },

  async getMyBookings(phone) {
    if (this.isMock()) {
      return getMockBookings();
    }

    try {
      const res = await request(`/bookings/my${phone ? `?phone=${encodeURIComponent(phone)}` : ''}`);
      return res.data || [];
    } catch {
      return getMockBookings();
    }
  },

  async cancelBooking(bookingId) {
    if (this.isMock()) {
      const current = getMockBookings();
      const updated = current.map(b => b.id === bookingId ? { ...b, status: 'cancelled', paymentStatus: 'refunded_100_percent' } : b);
      saveMockBookings(updated);
      return { success: true, message: 'Mock booking cancelled' };
    }

    try {
      return await request(`/bookings/${bookingId}`, {
        method: 'DELETE'
      });
    } catch {
      return { success: true, message: 'Offline booking cancelled' };
    }
  },

  // Group Split Pay
  async createGroupSplit(splitDto) {
    if (this.isMock()) {
      return {
        splitId: `split-${Date.now()}`,
        ...splitDto,
        paidCount: 1,
        totalCount: splitDto.seats.length,
        progressPercent: Math.round((1 / splitDto.seats.length) * 100),
        isFullyPaid: false,
        members: splitDto.seats.map((seat, i) => ({
          id: i + 1,
          name: i === 0 ? splitDto.hostName : `Pending Friend #${i + 1}`,
          phone: i === 0 ? splitDto.hostPhone : '',
          seat,
          status: i === 0 ? 'paid' : 'pending',
          amountETB: splitDto.amountPerPerson,
          method: i === 0 ? 'Telebirr' : null,
          paidAt: i === 0 ? 'Just now' : null
        }))
      };
    }

    const res = await request('/group-split/create', {
      method: 'POST',
      body: JSON.stringify(splitDto)
    });
    return res.data;
  },

  async getGroupSplit(splitId) {
    if (this.isMock()) {
      return {
        splitId,
        members: [
          { id: 1, name: 'Yared M. (Group Host)', phone: '+251 911 *** 412', seat: '3A (Window)', status: 'paid', amountETB: 2200, method: 'Telebirr', paidAt: '12 mins ago' },
          { id: 2, name: 'Selamawit B.', phone: '+251 922 *** 890', seat: '3B (Aisle)', status: 'paid', amountETB: 2200, method: 'Telebirr', paidAt: '4 mins ago' },
          { id: 3, name: 'Pending Friend #3', phone: '', seat: '3C (Aisle)', status: 'pending', amountETB: 2200, method: null, paidAt: null },
          { id: 4, name: 'Pending Friend #4', phone: '', seat: '3D (Window)', status: 'pending', amountETB: 2200, method: null, paidAt: null }
        ]
      };
    }

    try {
      const res = await request(`/group-split/${splitId}`);
      return res.data;
    } catch {
      return null;
    }
  },

  async payGroupShare(splitId, payload) {
    if (this.isMock()) {
      return {
        success: true,
        message: `Mock share paid for ${payload.seat} via ${payload.method}`
      };
    }

    return await request(`/group-split/${splitId}/pay`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  // Ministry of Tourism Manifest
  async getManifest(tripId) {
    if (this.isMock()) {
      return {
        manifestRef: 'ET-MOT-MNF-2026-MOCK',
        tripId,
        tripTitle: 'Wenchi Crater Lake Hike & Boat Ride',
        vehicle: {
          model: 'Toyota Coaster (28 Passenger Seats)',
          plateNumber: '3 - A.A 84920',
          captainName: 'Mulugeta Bekele',
          captainLicense: 'Commercial Grade 4 Heavy Passenger'
        },
        tourGuide: {
          name: 'Dawit Mengistu',
          motLicense: 'MoT-LIC-2024-889',
          phone: '+251 911 234 567'
        },
        rosterSummary: {
          totalSeats: 28,
          confirmedPassengers: 28,
          escrowClearedPercentage: '100%'
        }
      };
    }

    try {
      const res = await request(`/manifest/${tripId}`);
      return res.data;
    } catch {
      return null;
    }
  }
};
