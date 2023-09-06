import React from 'react';
import styled from 'styled-components';

// Create a styled Footer component
const StyledFooter = styled.footer`
  background-color: #333; /* Background color */
  color: #fff; /* Text color */
  padding: 20px 0; /* Top and bottom padding */
  text-align: center;
`;

function Footer() {
  return (
    <StyledFooter>
      &copy; {new Date().getFullYear()} My Store. All rights reserved.
    </StyledFooter>
  );
}

export default Footer;
