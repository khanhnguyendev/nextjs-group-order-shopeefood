const API_BASE_URL = "https://gappapi.deliverynow.vn/api";
const DEFAULT_HEADERS = {
  "x-foody-api-version": "1",
  "x-foody-app-type": "1004",
  "x-foody-client-id": "",
  "x-foody-client-language": "en",
  "x-foody-client-type": "1",
  "x-foody-client-version": "3.0.0",
  "x-foody-access-token":
    "6cf780ed31c8c4cd81ee12b0f3f4fdaf05ddf91a29ffce73212e4935ed9295fd354df0f4bc015478450a19bf80fddbe13302a61aa0c705af8315aae5a8e9cd6b",
};

export async function getDeliveryInfo(shopUrl: string) {
  const commandUrl = `${API_BASE_URL}/delivery/get_from_url?url=${shopUrl}`;
  const response = await fetch(commandUrl, {
    method: "GET",
    headers: DEFAULT_HEADERS,
  });

  if (!response.ok) {
    throw new Error(`Failed to get delivery info for shopUrl: ${shopUrl}`);
  }

  return await response.json();
}

export async function getDeliveryInfoById(restaurantIds: string[]) {
  const commandUrl = `${API_BASE_URL}/delivery/get_infos`;
  const response = await fetch(commandUrl, {
    method: "POST",
    headers: DEFAULT_HEADERS,
    body: JSON.stringify(restaurantIds),
  });

  if (!response.ok) {
    throw new Error(`Failed to get delivery info by id: ${restaurantIds}`);
  }

  return await response.json();
}

export async function getDeliveryDetail(deliveryId: string) {
  const commandUrl = `${API_BASE_URL}/delivery/get_detail?id_type=2&request_id=${deliveryId}`;
  const response = await fetch(commandUrl, {
    method: "GET",
    headers: DEFAULT_HEADERS,
  });

  if (!response.ok) {
    throw new Error(
      `Failed to get delivery detail for deliveryId: ${deliveryId}.`
    );
  }

  return await response.json();
}

export async function getDeliveryDishes(deliveryId: string) {
  const commandUrl = `${API_BASE_URL}/dish/get_delivery_dishes?id_type=2&request_id=${deliveryId}`;
  const response = await fetch(commandUrl, {
    method: "GET",
    headers: DEFAULT_HEADERS,
  });

  if (!response.ok) {
    throw new Error(
      `Failed to get delivery dishes for deliveryId: ${deliveryId}.`
    );
  }

  return await response.json();
}

export async function searchGlobal(keyword: string, sortType: string) {
  const commandUrl = `${API_BASE_URL}/delivery/search_global`;
  const requestBody = {
    keyword: keyword,
    sort_type: sortType,
    category_group: 1,
    city_id: 217,
    delivery_only: true,
    foody_services: [1],
    full_restaurant_ids: true,
    position: {
      latitude: 10.772823,
      longitude: 106.727226,
    },
  };

  const response = await fetch(commandUrl, {
    method: "POST",
    headers: DEFAULT_HEADERS,
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to search restaurant for keyword: ${keyword} and sortType: ${sortType}.`
    );
  }

  return await response.json();
}
