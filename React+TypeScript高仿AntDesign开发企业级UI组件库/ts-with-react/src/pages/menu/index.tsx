import React from "react";
import Menu from "../../components/Menu/menu";
import MenuItem from "../../components/Menu/menuItem";

const MenuDemo: React.FC<any> = () => {
  return (
    <>
      <Menu
        defaultIndex="0"
        onSelect={(index) => {
          console.log(index);
        }}
      >
        <MenuItem>选项1</MenuItem>
        <MenuItem>选项2</MenuItem>
        <MenuItem>选项3</MenuItem>
      </Menu>
    </>
  );
};

export default MenuDemo;
