import React from "react";
import Menu from "../../components/Menu/menu";
import MenuItem from "../../components/Menu/menuItem";
import SubMenu from "../../components/Menu/subMenu";

const MenuDemo: React.FC<any> = () => {
  return (
    <>
      <h3>水平</h3>
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

      <h3>垂直</h3>
      <Menu defaultIndex="0" mode="vertical">
        <MenuItem>选项1</MenuItem>
        <MenuItem>选项2</MenuItem>
        <MenuItem>选项3</MenuItem>
      </Menu>

      <h3>水平子列表</h3>
      <Menu
        defaultIndex="0"
        onSelect={(index) => {
          console.log(index);
        }}
      >
        <MenuItem>选项1</MenuItem>
        <MenuItem>选项2</MenuItem>
        <MenuItem>选项3</MenuItem>
        <SubMenu title="选项4">
          <MenuItem>选项4-1</MenuItem>
          <MenuItem>选项4-2</MenuItem>
          <MenuItem>选项4-3</MenuItem>
        </SubMenu>
      </Menu>

      <h3>垂直子列表</h3>
      <Menu defaultIndex="0" mode="vertical" defaultOpenSubMenus={["3"]}>
        <MenuItem>选项1</MenuItem>
        <MenuItem>选项2</MenuItem>
        <MenuItem>选项3</MenuItem>
        <SubMenu title="选项4">
          <MenuItem>选项4-1</MenuItem>
          <MenuItem>选项4-2</MenuItem>
          <MenuItem>选项4-3</MenuItem>
        </SubMenu>
      </Menu>
    </>
  );
};

export default MenuDemo;
