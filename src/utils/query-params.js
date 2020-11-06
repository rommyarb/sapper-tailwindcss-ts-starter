import { writable } from 'svelte/store';

export const createQueryParamSet = (paramName, initialItems = extractQueryParamArray(paramName)) => {
  const { subscribe, set, update } = writable(new Set(initialItems));

  subscribe(items => {
    updateUrl(paramName, items);
  });

  return {
    subscribe,
    set,
    update,
    add: item => {
      update(items => {
        items.add(item);
        return items;
      });
    },
    remove: item => {
      update(items => {
        items.delete(item);
        return items;
      });
    },
    toggle: item => {
      update(items => {
        if (items.has(item)) {
          items.delete(item);
        } else {
          items.add(item);
        }
        return items;
      });
    },
    clear: () => {
      update(items => {
        items.clear();
        return items;
      });
    }
  };
};

const updateUrl = (paramName, items) => {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams();
  items.forEach(item => params.append(paramName, item));
  const paramStr = params.toString();
  const url = paramStr ? `${window.location.pathname}?${paramStr}` : window.location.pathname;
  window.history.replaceState({}, '', decodeURIComponent(url));
};

const extractQueryParamArray = paramName => {
  if (typeof window === 'undefined') return [];

  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has(paramName) ? urlParams.getAll(paramName) : [];
};
