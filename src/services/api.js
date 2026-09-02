/**
 * GuzoTribe Unified API Service
 * Connects directly to the NestJS & PostgreSQL backend at /api/*
 * Gracefully falls back to localized datasets if backend service is booting or offline.
 */

import { tripsData as fallbackTrips } from '../data/tripsData';

const BASE_URL = '/api';

async function request(endpoint, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
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

export const api = {
  // Trips
  async getTrips(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await request(`/trips${query ? `?${query}` : ''}`);
      return res.data || [];
    } catch {
      return fallbackTrips;
    }
  },

  async getTripById(id) {
    try {
      const res = await request(`/trips/${id}`);
      return res.data;
    } catch {
      return fallbackTrips.find(t => t.id === id) || fallbackTrips[0];
    }
  },

  async createTrip(tripData) {
    const res = await request('/trips', {
      method: 'POST',
      body: JSON.stringify(tripData)
    });
    return res.data;
  },

  // Bookings
  async createBooking(bookingDto) {
    const res = await request('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingDto)
    });
    return res.data;
  },

  async getMyBookings(phone) {
    const res = await request(`/bookings/my${phone ? `?phone=${encodeURIComponent(phone)}` : ''}`);
    return res.data || [];
  },

  async cancelBooking(bookingId) {
    return await request(`/bookings/${bookingId}`, {
      method: 'DELETE'
    });
  },

  // Group Split Pay
  async createGroupSplit(splitDto) {
    const res = await request('/group-split/create', {
      method: 'POST',
      body: JSON.stringify(splitDto)
    });
    return res.data;
  },

  async getGroupSplit(splitId) {
    const res = await request(`/group-split/${splitId}`);
    return res.data;
  },

  async payGroupShare(splitId, payload) {
    return await request(`/group-split/${splitId}/pay`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  // Ministry of Tourism Manifest
  async getManifest(tripId) {
    const res = await request(`/manifest/${tripId}`);
    return res.data;
  }
};
