import React, { useState } from 'react';
import './App.css';
import {
  ChakraProvider,
  useDisclosure,
  Box,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Portal,
  Input,
  Text,
} from '@chakra-ui/react';

import Icon from './conponent/icon';
import { RepoModal } from './conponent/repoModal';
import { TextInput } from './conponent/text';
import { SearchButton } from './conponent/searchButton';
import { SearchResult } from './conponent/searchResult';
import theme from './theme';
import { Method } from './method/method';
import axios from 'axios';

function App() {
  const {
    loading,
    gitHubData,
    textChange,
    downEnter,
    inputValue,
    handleRequest,
    handleData,
    repoData,
    isOpen,
    onClose,
    clickButtton,
    filterTextChange,
  } = Method();

  //フィルター機能
  //言語
  //star
  //issue数
  //watcher
  //fork
  const {
    onOpen: popoverOpen,
    onClose: popoverClose,
    isOpen: poopverOnOpne,
  } = useDisclosure();

  return (
    <ChakraProvider theme={theme}>
      <Box className="App">
        <Box display={'flex'} justifyContent={'center'}>
          <Box width={'80%'} display={'flex'} m={'5px'}>
            <TextInput
              inputValue={inputValue}
              textChange={textChange}
              downEnter={downEnter}
            />
            <SearchButton
              handleRequest={handleRequest}
              loading={loading}
              inputValue={inputValue as string}
            />
          </Box>
        </Box>

        <Popover isOpen={poopverOnOpne} onOpen={popoverOpen}>
          <PopoverTrigger>
            <Button>フィルター</Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <form onSubmit={clickButtton}>
                <PopoverBody>
                  <Text>プロジェクト言語</Text>
                  <Input
                    onChange={(e) => {
                      filterTextChange(e);
                    }}
                  />
                  <Text>最低⭐️数</Text>
                  <Input />
                  <Text>最低👀数</Text>
                  <Input />
                  <Text>最低🍴数</Text>
                  <Input />
                  <Text>最高issue数</Text>
                  <Input />
                </PopoverBody>
                <PopoverFooter
                  display={'flex'}
                  justifyContent={'space-between'}
                >
                  {' '}
                  <Button type="submit" onClick={popoverClose}>
                    cancel
                  </Button>
                  <Button type="submit" onClick={popoverClose}>
                    決定
                  </Button>
                </PopoverFooter>
              </form>
            </PopoverContent>
          </Portal>
        </Popover>

        <SearchResult gitHubData={gitHubData} handleData={handleData} />

        {isOpen && (
          <RepoModal isOpen={isOpen} onClose={onClose} repoData={repoData} />
        )}
      </Box>
    </ChakraProvider>
  );
}

export default App;
