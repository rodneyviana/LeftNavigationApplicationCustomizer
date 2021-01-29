import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Nav, INavLink, INavStyles, INavLinkGroup, initializeIcons, Stack } from 'office-ui-fabric-react';



// Initialize icons in case this example uses them
initializeIcons();

const navStyles: Partial<INavStyles> = {
  root: {
    width: 208,
    height: 350,
    boxSizing: 'border-box',
    border: '1px solid #eee',
    overflowY: 'auto',
  },
};

const navLinkGroups: INavLinkGroup[] = [
  {
    links: [
      {
        name: 'Home',
        url: 'http://example.com',
        expandAriaLabel: 'Expand Home section',
        collapseAriaLabel: 'Collapse Home section',
        links: [
          {
            name: 'Activity',
            url: 'http://msn.com',
            key: 'key1',
            target: '_blank',
          },
          {
            name: 'MSN',
            url: 'http://msn.com',
            disabled: true,
            key: 'key2',
            target: '_blank',
          },
        ],
        isExpanded: true,
      },
      {
        name: 'Documents',
        url: 'http://example.com',
        key: 'key3',
        isExpanded: true,
        target: '_blank',
      },
      {
        name: 'Pages',
        url: 'http://msn.com',
        key: 'key4',
        target: '_blank',
      },
      {
        name: 'Notebook',
        url: 'http://msn.com',
        key: 'key5',
        disabled: true,
      },
      {
        name: 'Communication and Media',
        url: 'http://msn.com',
        key: 'key6',
        target: '_blank',
      },
      {
        name: 'News',
        url: 'http://cnn.com',
        icon: 'News',
        key: 'key7',
        target: '_blank',
      },
    ],
  },
];

const NavBasicExample: React.FunctionComponent = () => {
  return (
    <Nav
      onLinkClick={_onLinkClick}
      selectedKey="key3"
      ariaLabel="Nav basic example"
      styles={navStyles}
      groups={navLinkGroups}
    />
  );
};

function _onLinkClick(ev?: React.MouseEvent<HTMLElement>, item?: INavLink) {
  if (item && item.name === 'News') {
    alert('News link clicked');
  }
}



export const AddNavigation = (): boolean => {
  let elementNode: NodeListOf<HTMLElement> = document.getElementsByTagName("article");

  if (elementNode.length === 0)
  {
    return false;
  }
  let once = document.getElementById("spanABC");
  if(once)
  {
    return false;
  }
  let element = elementNode.item(0);
  let parent = element.parentNode;
  var wrapper = document.createElement("span");
  wrapper.setAttribute("id", "spanABC");
  // set the wrapper as child (instead of the element)
  parent.replaceChild(wrapper, element);
  // set element as child of wrapper
  wrapper.appendChild(element);

  let final =
    <Stack horizontal verticalAlign="start" >
        <Stack.Item>
          <span><NavBasicExample /></span>
        </Stack.Item>
        <Stack.Item>
          <span id="thisnameisunique" />
         </Stack.Item>
      </Stack> ;


  ReactDOM.render(final, wrapper);
  let newElement = document.getElementById('thisnameisunique');
  newElement.appendChild(element);

};
