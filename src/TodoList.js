import { DeleteIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

function TodoList() {
  const [todos, setTodos] = useState(() => {
    const getTodo = localStorage.getItem("todos");
    return getTodo ? JSON.parse(getTodo) : [];
  });

  // const [mode, setMode] = useState(() => {
  //   const getMode = localStorage.getItem("mode");
  //   return getMode ? JSON.parse(getMode) : [{id: false}];
  // });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cRef = useRef();
  const [currentID, setCurrentID] = useState();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  // useEffect(() => {
  //   localStorage.setItem("mode", JSON.stringify(mode));
  // }, [mode]);
  //자바스크립트파일을 제이슨으로 변경해주면서 변경후에 로컬저장소에 저장된다. 이 기능을 하지 않으면 저장이 되지 않는다.

  const onSubmitTodo = (data) => {
    const { todo } = data;
    setTodos([...todos, { id: Date.now(), text: todo, finish: false }]);
    reset();
  };

  const onChangeCheck = (id) => {
    setTodos(
      todos.map((data) =>
        data.id === id ? { ...data, finish: !data.finish } : data
      )
    );
  };

  const onClickDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const todocount = todos.filter((todo) => todo.finish === true);
  // console.log(todocount[0].finish);

  return (
    <Container
      maxW={"450px"}
      w={"100%"}
      minH={"100vh"}
      m={"0 auto"}
      bgColor={"green.300"}
      padding={"100px 20px"}
    >
      <Flex
        w={"100%"}
        justifyContent={"space-around"}
        alignItems={"center"}
        border={"1px solid RGBA(0, 0, 0, 0.24)"}
        borderRadius={"15px"}
        padding={"20px"}
        bgColor={"green.500"}
      >
        <Heading color={"RGBA(255, 255, 255, 0.80)"}>Todo-List-Plus</Heading>
        <Box
          w={"100px"}
          h={"100px"}
          borderRadius={"50%"}
          textAlign={"center"}
          lineHeight={"100px"}
          fontSize={"25px"}
          fontWeight={600}
          bgColor={"RGBA(0, 0, 0, 0.36)"}
          boxSizing={"border-box"}
          color={"RGBA(255, 255, 255, 0.80)"}
        >
          {todos.length === 0 ? "0" : `${todocount.length}/${todos.length}`}
        </Box>
      </Flex>
      <Flex h={"110px"} flexWrap={"wrap"}>
        <Box
          as="form"
          h={"10px"}
          m={"30px 0"}
          onSubmit={handleSubmit(onSubmitTodo)}
          display={"flex"}
          justifyContent={"space-between"}
          w={"100%"}
        >
          <Input
            {...register("todo", {
              required: "내용을 작성해 주세요.",
            })}
            placeholder="할일을 입력해주세요"
            borderColor={"gray.100"}
            bgColor={"gray.100"}
            size={"md"}
            width={"85%"}
          />

          <Button
            type="submit"
            w={"10%"}
            borderRadius={"50%"}
          >
            +
          </Button>
        </Box>
        <Box>{errors?.todo?.message}</Box>
      </Flex>

      <VStack h={"100%"}>
        {todos.map((data) => (
          <Checkbox
            key={data.id}
            w={"100%"}
            h={"50px"}
            border={"1px solid RGBA(0, 0, 0, 0.24)"}
            p={"15px"}
            size={"lg"}
            isChecked={data.finish}
            onChange={() => onChangeCheck(data.id)}
            borderRadius={"5px"}
            colorScheme={"green"}
            bgColor={"green.100"}
          >
            <Flex fontWeight={"600"} color={"Gray 900"}>
              <Text
                textDecoration={data.finish === true ? "line-through" : "none"}
              >
                {data.text}
              </Text>

              <DeleteIcon
                onClick={() => {
                  onOpen();
                  setCurrentID(data.id);
                }}
                position={"absolute"}
                top={"14px"}
                right={"20px"}
                fontSize={"22px"}
              />
            </Flex>
          </Checkbox>
        ))}
      </VStack>

      <AlertDialog isOpen={isOpen}>
        <AlertDialogOverlay>
          <AlertDialogContent w={"90%"}>
            <AlertDialogHeader>삭제 확인</AlertDialogHeader>
            <AlertDialogBody>정말 삭제하시겠습니까?</AlertDialogBody>
            <AlertDialogFooter>
              <Button
                onClick={() => {
                  onClickDelete(currentID);
                  onClose();
                  toast({
                    title: "삭제 완료.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                }}
                marginRight={"10px"}
              >
                삭제
              </Button>
              <Button ref={cRef} onClick={onClose}>
                취소
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
}

export default TodoList;
