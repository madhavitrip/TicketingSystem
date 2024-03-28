//Don't Change
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import { CBadge } from '@coreui/react'
import PermissionChecker from './../context/PermissionChecker'

export const AppSidebarNav = ({ items }) => {
  const location = useLocation()
  const navLink = (name, icon, badge, indent = false) => {
    return (
      <>
        {icon
          ? icon
          : indent && (
            <span className="nav-icon">
              <span className="nav-icon-bullet"></span>
            </span>
          )}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }
  

  const navItem = (item, index, indent = false) => {
    const { component: Component, name, badge, icon, ...rest } = item;
  
    return (

      <PermissionChecker>
      {({ hasPermission }) => {
        const isVisible = hasPermission(item.module, item.permission);

        if (isVisible) {
          return (
            <Component
              {...(rest.to &&
                !rest.items && {
                component: NavLink,
              })}
              key={index}
              {...rest}
            >
              {navLink(name, icon, badge, indent)}
            </Component>
          );
        }

        return null; // Return null if user doesn't have permission to see this nav item
      }}
    </PermissionChecker>
    )
  }
  const navGroup = (item, index) => {
    const { component, name, icon, items, module, permission, to, ...rest } = item
    console.log(module, permission);
    const Component = component
    return (
      <PermissionChecker>
      {({ hasPermission }) => {
        const isVisible = hasPermission(module, permission);

        if (isVisible) {
          return (
            <Component
              compact
              idx={String(index)}
              key={index}
              toggler={navLink(name, icon)}
              visible={location.pathname.startsWith(to)}
              {...rest}
            >
              {items?.map((subItem, subIndex) =>
                subItem.items ? (
                  navGroup(subItem, subIndex, location)
                ) : (
                  navItem(subItem, subIndex, true)
                )
              )}
            </Component>
          );
        }

        return null; // Return null if user doesn't have permission to see this nav group
      }}
    </PermissionChecker>
    )
  }

  return (
    <React.Fragment>
      {items &&
        items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
    </React.Fragment>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
