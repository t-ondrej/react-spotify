import NavCategoryItem from "./NavCategoryItem";
import styled from "styled-components";
import PropTypes from "prop-types";

const Title = styled.p`
  font-size: 14px;
  text-transform: uppercase;
  color: white;
  margin-left: 24px;
  margin-bottom: 4px;
`;

const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100%;
  overflow: overlay;
`;

const NavCategory = ({ title, items }) => {
  return (
    <>
      <Title>{title}</Title>

      <ItemsWrapper>
        {items.map(item => (
          <NavCategoryItem key={item.id} name={item.name} path={item.path} />
        ))}
      </ItemsWrapper>
    </>
  );
};

NavCategory.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    })
  )
};

export default NavCategory;
