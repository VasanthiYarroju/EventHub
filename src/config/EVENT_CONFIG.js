// src/config/EVENT_CONFIG.js

/**
 * Main configuration object for all event types.
 * Each key is a unique identifier (used in the URL).
 * - name: User-friendly display name.
 * - baseCost: The starting cost for this event type.
 * - extraServices: An array of services specific to this event.
 */
export const EVENT_CONFIG = {
  'wedding': {
    name: 'Wedding',
    baseCost: 50000,
    extraServices: [
      { id: 'photography', name: 'Candid Photography', cost: 25000 },
      { id: 'videography', name: 'Cinematic Videography', cost: 40000 },
      { id: 'dj-music', name: 'DJ & Sound System', cost: 15000 },
      { id: 'premium-decor', name: 'Premium Decoration', cost: 60000 },
    ],
  },
  'birthday-party': {
    name: 'Birthday Party',
    baseCost: 15000,
    extraServices: [
      { id: 'magic-show', name: 'Magic Show (1 hour)', cost: 8000 },
      { id: 'themed-decor', name: 'Themed Decoration', cost: 12000 },
      { id: 'game-coordinator', name: 'Game Coordinator', cost: 5000 },
      { id: 'return-gifts', name: 'Return Gifts (per guest)', cost: 300 }, // Example of a per-guest extra
    ],
  },
  'corporate-meeting': {
    name: 'Corporate Meeting',
    baseCost: 20000,
    extraServices: [
      { id: 'projector', name: 'Projector & Screen', cost: 7000 },
      { id: 'conference-mic', name: 'Conference Mic System', cost: 10000 },
      { id: 'whiteboard', name: 'Whiteboard & Markers', cost: 2000 },
    ],
  },
};

/**
 * Shared costs that are not specific to an event type.
 */
export const VENUE_COST_PER_GUEST = {
  ac: 150,
  non_ac: 100,
};

export const CATERING_COST_PER_GUEST = {
  basic: 450,
  standard: 750,
  premium: 1200,
};

/**
 * Utility function to get all available event types for a dropdown.
 * @returns {Array} - e.g., [{id: 'wedding', name: 'Wedding'}, ...]
 */
export const getAvailableEvents = () => {
    return Object.keys(EVENT_CONFIG).map(key => ({
        id: key,
        name: EVENT_CONFIG[key].name,
    }));
};