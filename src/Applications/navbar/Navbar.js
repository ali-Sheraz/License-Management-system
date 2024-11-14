// // src/Applications/navbar/Navbar.js
// import React from 'react';
// import { Menu, Container, Icon, Popup } from 'semantic-ui-react';
// import { NavLink } from 'react-router-dom';
// import './Navbar.css'; // Import the CSS file for additional styling
// //fixed="top"
// const Navbar = () => {
//     return (
//         <Menu  inverted size="large" className="navbar">
//             <Container style={{ marginTop: "initial", fontSize: "small", width: "auto" }}>
//                 {/* <Menu.Item header className='company-name'>
//                     Unison Ace
//                 </Menu.Item> */}
//                 <Menu.Item as={NavLink} exact={true} to="/" name="addAllApplication">
//                     <Icon name="user" /> Add Application
//                 </Menu.Item>
//                 <Menu.Item as={NavLink} to="/registeredapplication" name="registeredapplication">
//                     <Icon name="list" />Applications
//                 </Menu.Item>
//                 <Menu.Item as={NavLink} to="/usersubscriptionplan" name="userSubscriptionplan">
//                     <Icon name="list" /> User Subscription Plan
//                 </Menu.Item>
//                 <Menu.Item as={NavLink} to="/userlicense" name="userlicense">
//                     <Icon name="list" /> User License
//                 </Menu.Item>
//                 <Menu.Item as={NavLink} to="/updateSubscription/:userId/:appId/:subscriptionId/:subscriptionType" name="updateSubscription">
//                     <Icon name="edit" /> Update Subscription
//                 </Menu.Item>
//                 <Menu.Item as={NavLink} to="/updateapplication/:appId" name="updateapplication">
//                     <Icon name="edit" /> Update Application
//                 </Menu.Item>
//                 <Menu.Item as={NavLink} to="/allsessions" name="allsessions">
//                     <Icon name="list" /> Sessions
//                 </Menu.Item>
//                 <Menu.Item as={NavLink} to="/addsubscriptionplan" name="addsubscriptionplan">
//                     <Icon name="list" /> Add Plans
//                 </Menu.Item>
//                 <Menu.Item as={NavLink} to="/getplans" name="getplans">
//                     <Icon name="list" />Plans
//                 </Menu.Item>
//                 <Menu.Item as={NavLink} to="/getusers" name="getusers">
//                     <Icon name="list" />Users
//                 </Menu.Item>
//                 <Menu.Item>
//                     <Popup
//                         trigger={<Icon name='user' />}
//                         on='click'
//                         position='bottom right'
//                         style={{ minWidth: 'auto', padding: '0' }} // Adjust the width and padding
//                     >
//                         <Popup.Content style={{ padding: '0' ,margin:'0'}}>
//                             <Menu vertical>
//                                 <Menu.Item as={NavLink} to="/profile" name="profile">
//                                     Profile
//                                 </Menu.Item>
//                                 <Menu.Item as={NavLink} to="/login" name="login">
//                                     Logout
//                                 </Menu.Item>

//                             </Menu>
//                         </Popup.Content>
//                     </Popup>
//                 </Menu.Item>
//             </Container>
//         </Menu>
//     );
// };

// export default Navbar;
import React, { useEffect,useContext  } from 'react';
import { Menu, Container, Icon, Popup, Sidebar, Button, Image } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from './ThemeContext'; 
import './Themes.css'; // Import the themes CSS
import './Navbar.css'; // Import the CSS file for additional styling

const Navbar = () => {
  const [visible, setVisible] = React.useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext); 

  // Hook to handle screen width changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 968) {
        setVisible(false);
      }
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className="mobile-navbar">
        <Sidebar
          style={{ background: "linear-gradient(195deg, rgb(94, 98, 147),rgb(46, 48, 78))", width: "auto" }}
          as={Menu}
          animation="overlay"
          direction="left"
          inverted
          vertical
          visible={visible}
          onHide={() => setVisible(false)}
        >
          <div className="close-icon-container">
            <div className='close-icon-check'>
              <h6 className="css-i4qfl5">
                <Icon className="css-kyh2wa" name="close" onClick={() => setVisible(false)} />
              </h6>
            </div>
            <a className="css-cz6ae8" href="/"><Image className="css-189bj80" src='https://payments.xonder.co.uk/static/media/xonder-logo.371ef1e4ff6a2e95280a5750970be47b.svg' alt="Brand" /></a>
          </div>
          <hr class="css-6vm7vh"></hr>
          <Menu.Item as={NavLink} exact to="/" name="addAllApplication" onClick={() => setVisible(false)}>
          Add Application<Icon name="user" /> 
          </Menu.Item>
          <Menu.Item as={NavLink} to="/registeredapplication" name="registeredapplication" onClick={() => setVisible(false)}>
            <Icon name="list" /> Applications
          </Menu.Item>
          <Menu.Item as={NavLink} to="/usersubscriptionplan" name="userSubscriptionplan" onClick={() => setVisible(false)}>
            <Icon name="list" /> User Subscription Plan
          </Menu.Item>
          <Menu.Item as={NavLink} to="/userlicense" name="userlicense" onClick={() => setVisible(false)}>
            <Icon name="list" /> User License
          </Menu.Item>
          <Menu.Item as={NavLink} to="/updateSubscription/:userId/:appId/:subscriptionId/:subscriptionType" name="updateSubscription" onClick={() => setVisible(false)}>
            <Icon name="edit" /> Update Subscription
          </Menu.Item>
          <Menu.Item as={NavLink} to="/updateapplication/:appId" name="updateapplication" onClick={() => setVisible(false)}>
            <Icon name="edit" /> Update Application
          </Menu.Item>
          <Menu.Item as={NavLink} to="/allsessions" name="allsessions" onClick={() => setVisible(false)}>
            <Icon name="list" /> Sessions
          </Menu.Item>
          <Menu.Item as={NavLink} to="/addsubscriptionplan" name="addsubscriptionplan" onClick={() => setVisible(false)}>
            <Icon name="list" /> Add Plans
          </Menu.Item>
          <Menu.Item as={NavLink} to="/getplans" name="getplans" onClick={() => setVisible(false)}>
            <Icon name="list" /> Plans
          </Menu.Item>
          <Menu.Item as={NavLink} to="/getusers" name="getusers" onClick={() => setVisible(false)}>
            <Icon name="list" /> Users
          </Menu.Item>
        </Sidebar>

        <Button icon="bars" onClick={() => setVisible(!visible)} className="" />
        <div className="mobile-user-menu">
          <Popup
            trigger={<Icon name='user' />}
            on='click'
            position='bottom right'
            style={{ minWidth: 'auto', padding: '0' }}
          >
            <Popup.Content style={{ padding: '0', margin: '0' }}>
              <Menu vertical>
                <Menu.Item as={NavLink} to="/profile" name="profile">
                  Profile
                </Menu.Item>
                <Menu.Item as={NavLink} to="/login" name="login">
                  Logout
                </Menu.Item>
              </Menu>
            </Popup.Content>
          </Popup>
        </div>
      </div>

      <div className="desktop-navbar">
        <Menu inverted size="large" className="navbar">
          <Container style={{ marginTop: 'initial', fontSize: 'small', width: 'auto' }}>
            <Menu.Item as={NavLink} exact to="/" name="addAllApplication">
              <Icon name="user" /> Add Application
            </Menu.Item>
            {/* <Menu.Item>
              <Button onClick={toggleTheme}>
                {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              </Button>
            </Menu.Item> */}
            <Menu.Item as={NavLink} to="/registeredapplication" name="registeredapplication">
              <Icon name="list" /> Applications
            </Menu.Item>
            <Menu.Item as={NavLink} to="/usersubscriptionplan" name="userSubscriptionplan">
              <Icon name="list" /> User Subscription Plan
            </Menu.Item>
            <Menu.Item as={NavLink} to="/userlicense" name="userlicense">
              <Icon name="list" /> User License
            </Menu.Item>
            <Menu.Item as={NavLink} to="/updateSubscription/:userId/:appId/:subscriptionId/:subscriptionType" name="updateSubscription">
              <Icon name="edit" /> Update Subscription
            </Menu.Item>
            <Menu.Item as={NavLink} to="/updateapplication/:appId" name="updateapplication">
              <Icon name="edit" /> Update Application
            </Menu.Item>
            <Menu.Item as={NavLink} to="/allsessions" name="allsessions">
              <Icon name="list" /> Sessions
            </Menu.Item>
            <Menu.Item as={NavLink} to="/addsubscriptionplan" name="addsubscriptionplan">
              <Icon name="list" /> Add Plans
            </Menu.Item>
            <Menu.Item as={NavLink} to="/getplans" name="getplans">
              <Icon name="list" /> Plans
            </Menu.Item>
            <Menu.Item as={NavLink} to="/getusers" name="getusers">
              <Icon name="list" /> Users
            </Menu.Item>
            <Menu.Item>
              <Popup
                trigger={<Icon name='user' />}
                on='click'
                position='bottom right'
                style={{ minWidth: 'auto', padding: '0' }}
              >
                <Popup.Content style={{ padding: '0', margin: '0' }}>
                  <Menu vertical>
                    <Menu.Item as={NavLink} to="/profile" name="profile">
                      Profile
                    </Menu.Item>
                    <Menu.Item as={NavLink} to="/login" name="login">
                      Logout
                    </Menu.Item>
                  </Menu>
                </Popup.Content>
              </Popup>
            </Menu.Item>
          </Container>
        </Menu>
      </div>
    </>
  );
};

export default Navbar;
