import React, { useState, useEffect } from "react";
import { useWeb3ExecuteFunction } from "react-moralis";
import { abi as contractAbi } from "../constants/abis/Token.json";
import { Text, VStack, Button, Box, Image } from "@chakra-ui/react";

export default function Hashtro({ isServerInfo }) {
  // contract
  const contractAddress = "0x82d95A1Ccd9E06245E27fBf7e4678ea01CBA8311"; // <-- paste in contract address from truffle compile
  // web3 functionality
  const { error, fetch, isFetching } = useWeb3ExecuteFunction();
  // Hashtro data
  const [hashtroId, setHashtroId] = useState(null);
  const [hashtroData, setHashtro] = useState(null);
  const [dataFetched, setDataFetched] = useState();
  const [interactionData, setInteractionData] = useState();

  useEffect(() => {
    // if we get the ID to load then fetch that IDs data from chain
    // then dep `interactionData` means we update the display after feeding
    if (hashtroId) {
      fetchData(hashtroId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hashtroId, interactionData]); // <-- the above updates on these changing

  useEffect(() => {
    // updates the hashtro's state
    console.log("Fetched", dataFetched);
    setHashtro(dataFetched);
  }, [dataFetched]); // <-- the above updates on this changing

  // interact with Hastro token (NFT)
  async function feedData(_id) {
    const options = {
      abi: contractAbi,
      contractAddress,
      functionName: "feed",
      params: {
        tokenId: _id,
      },
    };

    await fetch({
      params: options,
      onSuccess: (response) => setInteractionData(response),
      onComplete: () => console.log("Fed"),
      onError: () => console.log("Error", error),
    });
  }

  // fetch Hastro token (NFT)
  async function fetchData(_id) {
    if (isServerInfo) {
      const options = {
        abi: contractAbi,
        contractAddress,
        functionName: "getTokenDetails",
        params: {
          tokenId: _id,
        },
      };

      await fetch({
        params: options,
        onSuccess: (response) => setDataFetched(response),
        onComplete: () => console.log("Fetched"),
        onError: (error) => console.log("Error", error),
      });
    }
  }

  // date formatting
  function addLeadingZeros(n) {
    if (n <= 9) {
      return "0" + n;
    }
    return n;
  }

  // Render date data
  function deathTimeRender(_deathTime) {
    return (
      addLeadingZeros(_deathTime.getDate()) +
      "/" +
      addLeadingZeros(_deathTime.getMonth() + 1) +
      "/" +
      _deathTime.getFullYear() +
      " " +
      addLeadingZeros(_deathTime.getHours()) +
      ":" +
      addLeadingZeros(_deathTime.getMinutes()) +
      ":" +
      addLeadingZeros(_deathTime.getSeconds())
    );
  }

  // Realtime UI
  function gameRenderer(_data) {
    if (!hashtroData) {
      return (
        <VStack>
          <Text>Nothing Loaded</Text>
        </VStack>
      );
    } else {
      let now = new Date();
      let deathStatus = "ALIVE";

      let deathTime = null;
      if (hashtroData != null) {
        deathTime = new Date(
          (parseInt(hashtroData.lastMeal) + parseInt(hashtroData.endurance)) *
            1000
        );
      }
      if (now > deathTime) {
        deathStatus = "DEAD";
      }

      return (
        <VStack>
          <Box>
            {/* <-- TEMPORARY: static link and will be loaded from id of NFT's metadata --> */}
            <Image src="https://gateway.pinata.cloud/ipfs/QmYERyUXYxk6tRV3HecQmAzhmcxKbFr4TMFAVEK5yWCYBN?preview=1" />
          </Box>
          <Box>
            <Text>Status: {deathStatus}</Text>
          </Box>
          <Box>
            <Text>Deathtime: {deathTimeRender(deathTime)}</Text>
          </Box>
          <Box>
            <Text>ID: {hashtroData.id}</Text>
          </Box>
          <Box>
            <Text>Damage: {hashtroData.damage}</Text>
          </Box>
          <Box>
            <Text>Power: {hashtroData.power}</Text>
          </Box>
          <Box>
            <Text>Endurance: {hashtroData.endurance}</Text>
          </Box>
        </VStack>
      );
    }
  }

  // UI interactions
  function onSubmit(e) {
    e.preventDefault();
    setHashtroId(e.target.attributes["data-hashtro-id"].value);
  }
  function onFeed(e) {
    e.preventDefault();
    //console.log(e.target.attributes["data-hashtro-id"].value);
    if (hashtroId) {
      feedData(hashtroId);
    }
  }
  // UI
  return (
    <Box style={{ display: "flex", gap: "10px" }}>
      <Box>
        <VStack>
          <Button
            name="fetch"
            onClick={onSubmit}
            disabled={dataFetched || isFetching ? true : false}
            colorScheme="green"
            size="lg"
            variant="solid"
            data-hashtro-id={0}
            leftIcon={"👨‍🚀"}
          >
            Fetch
          </Button>
          <Button
            name="feed"
            onClick={onFeed}
            disabled={!dataFetched || isFetching ? true : false}
            colorScheme="purple"
            size="lg"
            variant="solid"
            leftIcon={"🌮"}
            data-hashtro-id={0}
          >
            Feed
          </Button>
        </VStack>
        <>{gameRenderer(hashtroData)}</>
      </Box>
    </Box>
  );
}
