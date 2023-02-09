import { FullGovernanceImplementation } from 'stores/types';
import {
  useApproveTokens,
  useCreateProposal,
  useExecuteProposal,
  useLockTokens,
  useVoteOnProposal,
  useWithdrawTokens,
} from './writers';
import {
  useProposal,
  useSnapshotId,
  useDAOToken,
  useIsProposalCreationAllowed,
  useProposalVotesOfVoter,
  useProposalCalls,
  useVotingResults,
  useGetPermissions,
  useGuildConfig,
  useGetVotes,
  useGetMemberList,
  useGetAllPermissions,
  useGetNumberOfActiveProposals,
} from '../common/fetchers';
import {
  useGuildConfig as useGuildConfigFromSubgraph,
  useGetMemberList as useGetMemberListFromSubgraph,
  useGetNumberOfActiveProposals as useGetNumberOfActiveProposalsFromSubgraph,
  useProposal as useProposalFromSubgraph,
  useGetAllPermissions as useGetAllPermissionsFromSubgraph,
  useGetVotes as useGetVotesFromSubgraph,
  useProposalVotesOfVoter as useProposalVotesOfVoterFromSubgraph,
} from '../subgraph/common';
import {
  useTotalLocked,
  useVoterLockTimestamp,
  useVotingPowerOf,
  useMemberCount,
} from './fetchers/rpc';
import { checkDataSourceAvailability } from './checkDataSourceAvailability';
import localBytecodes from 'bytecodes/local.json';
import prodBytecodes from 'bytecodes/prod.json';

const GUILD_TYPE = 'SnapshotRepERC20Guild';
const localConfig = localBytecodes.find(({ type }) => type === GUILD_TYPE);
const prodConfig = prodBytecodes.find(({ type }) => type === GUILD_TYPE);
export const snapshotRepGuildImplementation: Readonly<FullGovernanceImplementation> =
  {
    name: 'SnapshotRepGuild',
    bytecodes: [
      '0x56735be1df2293bbbc687502a3673244d05fac86940394cb2222ea884f304daf',
      '0xec75e00a4daa1f5d4636a962298f55e322161e54b292f04a928c91f4f5333aed',
      '0xb33418b664bfb6eba3ea37a77429d95daee4f0ab24f47ee63c4669340c4aae5a',
      localConfig.bytecodeHash as `0x${string}`,
      localConfig.deployedBytecodeHash as `0x${string}`,
      prodConfig.deployedBytecodeHash as `0x${string}`,
    ],
    hooks: {
      fetchers: {
        default: {
          useProposal: useProposalFromSubgraph,
          useSnapshotId,
          useTotalLocked,
          useDAOToken,
          useIsProposalCreationAllowed,
          useProposalVotesOfVoter: useProposalVotesOfVoterFromSubgraph,
          useVoterLockTimestamp,
          useProposalCalls,
          useVotingResults,
          useVotingPowerOf,
          useMemberCount,
          useGetPermissions,
          useGuildConfig: useGuildConfigFromSubgraph,
          useGetVotes: useGetVotesFromSubgraph,
          useGetMemberList: useGetMemberListFromSubgraph,
          useGetAllPermissions: useGetAllPermissionsFromSubgraph,
          useGetNumberOfActiveProposals:
            useGetNumberOfActiveProposalsFromSubgraph,
        },
        fallback: {
          useProposal,
          useSnapshotId,
          useTotalLocked,
          useDAOToken,
          useIsProposalCreationAllowed,
          useProposalVotesOfVoter,
          useVoterLockTimestamp,
          useProposalCalls,
          useVotingResults,
          useVotingPowerOf,
          useMemberCount,
          useGetPermissions,
          useGuildConfig,
          useGetVotes,
          useGetMemberList,
          useGetAllPermissions,
          useGetNumberOfActiveProposals,
        },
      },
      writers: {
        useApproveTokens,
        useCreateProposal,
        useExecuteProposal,
        useLockTokens,
        useVoteOnProposal,
        useWithdrawTokens,
      },
    },
    capabilities: {
      votingPower: 'soulbound',
      tokenType: 'ERC20',
      consensus: 'quorum',
      votingStyle: 'competition',
      votingPowerTally: 'snapshot',
    },
    checkDataSourceAvailability,
  };
