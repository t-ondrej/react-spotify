import styled from "styled-components";
import durationIcon from "../../../../assets/duration.svg";

const Header = styled.div`
  display: grid;
  grid-template-columns: [index] 16px [first] 6fr [var1] 4fr [var2] 3fr [last] minmax(
      120px,
      1fr
    );
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
  grid-gap: 16px;
  height: 36px;
  position: sticky;
  top: 60px;
  background-color: #121212;
  margin: 0 0 16px;
  padding: 0 16px;
  min-width: 768px;
`;

const HeaderItem = styled.div`
  font-size: 12px;
  font-weight: 400;
  line-height: 36px;
  text-transform: uppercase;
`;

const TrackListHeader = () => {
  const items = ["#", "TITLE", "ALBUM", "DATE ADDED"];

  return (
    <Header>
      {items.map(item => (
        <HeaderItem key={item} className="ellipsis-one-line">
          {item}
        </HeaderItem>
      ))}
      <HeaderItem className="ellipsis-one-line">
        <img alt="Duration" src={durationIcon} />
      </HeaderItem>
    </Header>
  );
};

export default TrackListHeader;
