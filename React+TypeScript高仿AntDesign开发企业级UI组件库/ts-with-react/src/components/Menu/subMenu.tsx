import React, { useContext, FunctionComponentElement, useState } from "react";
import { MenuContext } from "./menu";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";

export interface SubMenuProps {
  index?: string;
  title?: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({
  index,
  title,
  children,
  className,
}) => {
  const context = useContext(MenuContext);
  const openedSubMenus = context.defaultOpenSubMenus as string[];
  const [menuOpen, setMenuOpen] = useState(
    index && context.mode === "vertical"
      ? openedSubMenus.includes(index)
      : false
  );

  const classes = classNames("menu-item submenu-item", className, {
    "is-active": context.index === index,
  });
  let timer: any;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  };

  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setMenuOpen(toggle);
    }, 300);
  };

  const renderChildren = () => {
    const subMenuClasses = classNames("viking-submenu", {
      "menu-opened": menuOpen,
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === "MenuItem") {
        return React.cloneElement(childElement, { index: `${index}-${i}` });
      } else {
        console.error("Warning: SubMenu has a child which is not a MenuItem");
      }
    });
    return <ul className={subMenuClasses}>{childrenComponent}</ul>;
  };

  const clickEvents =
    context.mode === "vertical" ? { onClick: handleClick } : {};
  const hoverEvents =
    context.mode !== "vertical"
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
          },
        }
      : {};

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";

export default SubMenu;
