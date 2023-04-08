import { Flex, Heading, Spacer, HStack } from "@chakra-ui/react";
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <Flex align="center" p={4} bgColor="teal.500" color="white">
      <Heading size="md"><Link to="/"> Snaxsmart</Link></Heading>
      <Spacer />
      <HStack spacing={8}>
        <Link to="/employee">Employees</Link>
        <Link to="/machines">Machines</Link>
      </HStack>
    </Flex>
  );
};

export default Navbar;