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
        <MenuItem index="0">选项1</MenuItem>
        <MenuItem index="1">选项2</MenuItem>
        <MenuItem index="2">选项3</MenuItem>
      </Menu>
    </>
  );
};

export default MenuDemo;
