import "./styles.scss";
type Props = {
  children: JSX.Element;
};
const BaseLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="base-layout__container">
      <div className="card__container">{children}</div>
    </div>
  );
};

export default BaseLayout;
