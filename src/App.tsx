import { useForm } from "@mantine/form";
import {
  TextInput,
  Button,
  Flex,
  PasswordInput,
  Box,
  Image,
} from "@mantine/core";
import g1 from "./assets/g1.svg";
import g2 from "./assets/g2.svg";

const App = () => {
  const form = useForm({
    mode: "uncontrolled",
    validateInputOnChange: true,
    initialValues: { name: "", email: "", password: "" },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 4 ? "You must be at least 4 to register" : null,
    },
  });

  return (
    <Flex h="100vh" w="100%">
      <Box flex={1} h="100vh" style={{ alignContent: "flex-end" }}>
        <Image w="auto" h="auto" src={g1} />
      </Box>
      <Box flex={2} style={{ justifyItems: "center", alignContent: "center" }}>
        <Box w={500}>
          <form onSubmit={form.onSubmit(console.log)}>
            <TextInput
              variant="filled"
              label="Name"
              placeholder="Name"
              key={form.key("name")}
              {...form.getInputProps("name")}
            />
            <TextInput
              variant="filled"
              mt="sm"
              label="Email"
              placeholder="Email"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
            <PasswordInput
              variant="filled"
              mt="sm"
              label="Password"
              placeholder="Password"
              key={form.key("password")}
              {...form.getInputProps("password")}
            />
            <Button mt="lg" ml="150" type="submit" w={200} bg="#817be7">
              Submit
            </Button>
          </form>
        </Box>
      </Box>

      <Box
        flex={1}
        h="100vh"
        style={{
          justifyItems: "flex-end",
        }}
      >
        <Image w="auto" h="auto" src={g2} />
      </Box>
    </Flex>
  );
};

export default App;
