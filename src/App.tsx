import './App.css';
import { ChakraProvider, Box } from '@chakra-ui/react';

import { RepoModal } from './conponent/repoModal';
import { TextInput } from './conponent/text';
import { SearchButton } from './conponent/searchButton';
import { SearchResult } from './conponent/searchResult';
import theme from './theme';
import { Method } from './method/method';

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
  } = Method();

  //フィルター機能
  //言語
  //star
  //issue数
  //watcher
  //fork

  return (
    <ChakraProvider theme={theme}>
      <Box className="App">
        <Box display={'flex'} justifyContent={'center'}>
          <Box width={'80%'} display={'flex'} m={'10px'} mb={'0px'}>
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

        <SearchResult gitHubData={gitHubData} handleData={handleData} />

        {isOpen && (
          <RepoModal isOpen={isOpen} onClose={onClose} repoData={repoData} />
        )}
      </Box>
    </ChakraProvider>
  );
}

export default App;
