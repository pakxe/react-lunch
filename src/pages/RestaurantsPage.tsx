import { css } from '@emotion/react';
import Dropdown from '../components/Dropdown/Dropdown';
import Tab from '../components/Tab';
import HeaderField from '../components/field/HeaderField';
import useProcessRestaurants from '../hooks/useProcessRestaurants';
import RowList from '../components/RowList';
import RestaurantItem from '../components/RestaurantItem';
import Text from '../components/Text';
import { CATEGORY_LIST } from '../constants/category';

const RestaurantsPage = () => {
  const { filter, sort, tab, handleTab, handleFilter, handleSort, restaurants } = useProcessRestaurants();

  const DEFAULT_ITEM = { value: 'all', name: '전체' };
  const CATEGORY_LIST_WITH_ALL = [DEFAULT_ITEM, ...CATEGORY_LIST];

  return (
    <>
      <HeaderField />
      <Tab defaultTabValue={tab} onSelectTab={(tab) => handleTab(tab)}>
        <Tab.Option value='total'>모든 음식점</Tab.Option>
        <Tab.Option value='favorite'>자주 가는 음식점</Tab.Option>
      </Tab>
      <div
        css={css`
          width: 100%;

          display: flex;
          justify-content: space-between;
        `}>
        <Dropdown defaultValue={filter} onClick={handleFilter}>
          {CATEGORY_LIST_WITH_ALL.map(({ value, name }) => (
            <Dropdown.Option key={value} value={value}>
              {name}
            </Dropdown.Option>
          ))}
        </Dropdown>
        <Dropdown defaultValue={sort} onClick={handleSort}>
          <Dropdown.Option value='latest'>최신순</Dropdown.Option>
          <Dropdown.Option value='name'>이름순</Dropdown.Option>
        </Dropdown>
      </div>
      <RowList>
        {restaurants.map((restaurant) => (
          <RestaurantItem restaurant={restaurant} key={restaurant.id} />
        ))}
      </RowList>
      {restaurants.length === 0 && (
        <Text type='caption' color='gray4'>
          음식점이 없습니다.
        </Text>
      )}
    </>
  );
};

export default RestaurantsPage;
