import { css } from '@emotion/react';
import Dropdown from '../components/Dropdowm/Dropdown';
import Tab from '../components/Tab';
import HeaderField from '../components/field/HeaderField';
import useProcessRestaurants from '../hooks/useProcessRestaurants';
import RowList from '../components/RowList';
import RestaurantItem from '../components/RestaurantItem';
import Text from '../components/Text';

const RestaurantsPage = () => {
  const { filter, sort, tab, handleTab, handleFilter, handleSort, restaurants } = useProcessRestaurants();

  return (
    <>
      <HeaderField />
      <Tab defaultTab={tab} onSelectTab={(tab) => handleTab(tab)}>
        <Tab.Option value='total'>모든 음식점</Tab.Option>
        <Tab.Option value='favorite'>자주 가는 음식점</Tab.Option>
      </Tab>
      <div
        css={css`
          width: 100%;

          display: flex;
          justify-content: space-between;
        `}>
        <Dropdown defaultValue={filter} onChange={handleFilter}>
          <Dropdown.Option value='all'>전체</Dropdown.Option>
          <Dropdown.Option value='korean'>한식</Dropdown.Option>
          <Dropdown.Option value='chinese'>중식</Dropdown.Option>
          <Dropdown.Option value='japanese'>일식</Dropdown.Option>
          <Dropdown.Option value='western'>양식</Dropdown.Option>
          <Dropdown.Option value='asian'>아시안</Dropdown.Option>
          <Dropdown.Option value='etc'>기타</Dropdown.Option>
        </Dropdown>
        <Dropdown defaultValue={sort} onChange={handleSort}>
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
