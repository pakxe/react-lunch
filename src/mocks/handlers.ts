import { http, HttpResponse } from 'msw';
import { Restaurant } from '../types/serviceType';
/**
 * /restaurants
 * get, post, delete, patch
 *
 * id, name, category, timeToMove, description, link, favorite
 */
const dummyData = [
  {
    id: 1,
    category: 'korean',
    name: '피양콩할머니',
    description:
      '2005년 장모님에게 전수받은 설렁탕 조리법을 개선하여 시작했다는 외고의 명물로, 깊고 진한 국물 맛이 특징입니다.',
    timeToMove: 10,
    link: 'https://example.com/piyang',
    favorite: false,
  },
  {
    id: 2,
    category: 'chinese',
    name: '친친',
    description:
      'Since 2004, 편리한 교통과 주차, 그리고 관록만큼 깊은 맛과 정성으로 정통 중국 요리를 선보이고 있는 맛집입니다.',
    timeToMove: 10,
    link: 'https://example.com/chinchin',
    favorite: true,
  },
  {
    id: 3,
    category: 'japanese',
    name: '잇쇼우',
    description:
      '잇쇼우는 정통 자가제면 사누키 우동이 대표메뉴입니다. 기술은 정성을 이길 수 없다는 철학으로 우동의 깊은 맛을 완성했습니다.',
    timeToMove: 5,
    link: 'https://example.com/isshou',
    favorite: true,
  },
  {
    id: 4,
    category: 'italian',
    name: '이태리키친',
    description:
      '2005년 장모님에게 전수받은 설렁탕 조리법을 개선하여 시작했다는 외고의 명물로, 다양한 이탈리아 요리를 선보이고 있습니다.',
    timeToMove: 20,
    favorite: false,
  },
  {
    id: 5,
    category: 'etc',
    name: '호아빈 삼성점',
    description:
      '2005년 장모님에게 전수받은 설렁탕 조리법을 개선하여 시작했다는 외고의 명물로, 풍미 깊은 커피와 디저트를 제공합니다.',
    timeToMove: 15,
    favorite: false,
  },
];

const restaurants = dummyData;

export const handlers = [
  // params에 filter를 담아받는다. favorite가 true면 favorite인 것만 반환. 없다면 전체
  http.get('https://example.com/restaurants', ({ request }) => {
    const url = new URL(request.url);

    const filter = url.searchParams.get('filter');

    if (filter === 'favorite') {
      return HttpResponse.json(restaurants.filter((restaurant) => restaurant.favorite));
    }
    return HttpResponse.json(restaurants);
  }),

  // TODO:  인자들
  http.post<any, Omit<Restaurant, 'id'>>('https://example.com/restaurants', async ({ request }) => {
    const newRestaurant = await request.json();

    // Calculate the new ID based on the last item's ID
    const lastId = restaurants.length > 0 ? restaurants[restaurants.length - 1].id : 0;
    const newId = lastId + 1;

    const restaurantWithId = { ...newRestaurant, id: newId, favorite: false };
    restaurants.push(restaurantWithId);

    return new Response();
  }),

  http.delete('https://example.com/restaurants/:id', (req) => {
    // id를 받아 지우기
    const { id } = req.params;
    const index = restaurants.findIndex((restaurant) => restaurant.id === Number(id));
    if (index === -1) {
      return new HttpResponse(null, {
        status: 404,
        statusText: '없어요',
      });
    }
    restaurants.splice(index, 1);
    return new Response();
  }),

  // favorite 추가하는 post api
  http.patch<any, Pick<Restaurant, 'favorite'>>('https://example.com/restaurants/:id', async ({ request, params }) => {
    const newFavorite = await request.json();
    const { id } = params;

    const restaurant = restaurants.find((restaurant) => restaurant.id === Number(id));

    if (!restaurant) {
      return new HttpResponse(null, {
        status: 404,
        statusText: '없어요',
      });
    }

    restaurant.favorite = newFavorite.favorite;

    return new Response();
  }),

  http.get('https://example.com/restaurants/:id', (req) => {
    const { id } = req.params;
    const restaurant = restaurants.find((restaurant) => restaurant.id === Number(id));

    if (!restaurant) {
      return new HttpResponse(null, {
        status: 404,
        statusText: '없어요',
      });
    }

    return HttpResponse.json(restaurant);
  }),
];
