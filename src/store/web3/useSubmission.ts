import { useCallback, useContext, useState, useEffect } from 'react'
import { Web3Context } from '../../context/Web3'
import Submission from './abis/Submission.json'
import { SUBMISSION } from '../../config/constants'

export default function useSubmission() {
  const { isConnected, account, web3 } = useContext(Web3Context)
  const [submission, setSubmission] = useState<any>(null)

  useEffect(() => {
    if (web3 !== null) {
      setSubmission(new web3.eth.Contract(Submission as any[], SUBMISSION))
    }
  }, [web3])

  const minBalanceForSubmit = useCallback(async () => {
    if (submission === null) return 0;
    return await submission.methods
      .minBalanceForSubmit()
      .call({ from: account })
  }, [submission, account])

  const BNBFee = useCallback(async () => {
    return await submission.methods.bnbFee().call({ from: account })
  }, [submission, account])

  const NFTFee = useCallback(async () => {
    return await submission.methods.nftFee().call({ from: account })
  }, [submission, account])

  const submitWithBNB = useCallback(
    async (id: string) => {
      const bnbFee = await BNBFee()
      try {
        const tx = await submission.methods
          .submitWithBNB(id)
          .send({ from: account, value: bnbFee })
        return { status: true, tx }
      } catch (err) {
        return { status: false }
      }
    },
    [submission, BNBFee, account],
  )

  const submitWithNFT = useCallback(
    async (id: string) => {
      const nftFee = await NFTFee()
      try {
        const tx = await submission.methods
          .submitWithNFT(id)
          .send({ from: account, value: nftFee })
        return { status: true, tx }
      } catch (err) {
        return { status: false }
      }
    },
    [submission, BNBFee, account],
  )

  const submitForFree = useCallback(
    async (id: string) => {
      try {
        const tx = await submission.methods
          .submitForFree(id)
          .send({ from: account })
        return { status: true, tx }
      } catch (err) {
        return { status: false }
      }
    },
    [submission, account],
  )

  const getProjectInfo = useCallback(
    async (id: string) => {
      try {
        const data = await submission.methods
          .projects(id)
          .call({ from: account })
        return { status: true, data }
      } catch (err) {
        return { status: false }
      }
    },
    [submission],
  )

  const isFreeMember = useCallback(async () => {
    return await submission.methods.isFreeMember().call({ from: account })
  }, [submission, account])

  const isNFTSubmission = useCallback(async () => {
    return await submission.methods.isNFTSubmission().call({ from: account })
  }, [submission, account])

  const approve = useCallback(
    async (id: string) => {
      try {
        await submission.methods.approve(id).send({ from: account })
        return { status: true }
      } catch (err) {
        return { status: false }
      }
    },
    [submission, account],
  )

  const reject = useCallback(
    async (id: string) => {
      try {
        await submission.methods.reject(id).send({ from: account })
        return { status: true }
      } catch (err) {
        return { status: false }
      }
    },
    [submission, account],
  )

  const isVetter = useCallback(async () => {
    try {
      const res = await submission.methods.isVetter().call({ from: account })
      console.log(res)
      return res
    } catch (err) {
      return false
    }
  }, [submission, account])

  const VetterAssessment = useCallback(
    async (id: string) => {
      try {
        const res = await submission.methods
          .permission(id, account)
          .call({ from: account })
        return { status: true, data: res }
      } catch (err) {
        return { status: false }
      }
    },
    [submission, account],
  )

  return {
    isConnected,
    account,
    minBalanceForSubmit,
    BNBFee,
    NFTFee,
    submitWithBNB,
    submitWithNFT,
    submitForFree,
    isFreeMember,
    isNFTSubmission,
    getProjectInfo,
    approve,
    reject,
    isVetter,
    VetterAssessment,
  }
}
