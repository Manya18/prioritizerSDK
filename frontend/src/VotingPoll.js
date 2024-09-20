import React, { useEffect } from 'react';
import PrioritizerSDK from './prioritizerSDK';

const VotingPoll = ({ apiUrl, features }) => {
  const sdk = new PrioritizerSDK({ apiUrl, features });

  useEffect(() => {
    sdk.init();
  }, [sdk]);

  return (
    <div id="poll" />
  );
};

export default VotingPoll;
