import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { getZkMeConfigByChainId } from '../../constants/zkmeConfig';

export default async (request: NextApiRequest, response: NextApiResponse) => {
    try {
        const chainId = request.query.chainId as string;
        const apiKey = process.env.ZKME_APIKEY
        const apiKeyTransactional = process.env.ZKME_APIKEY_BB

        const zkMeConfig = getZkMeConfigByChainId(parseInt(chainId));
        console.log("============",zkMeConfig)
        const res = await axios.post('https://nest-api.zk.me/api/token/get', {
            apiKey: zkMeConfig.isMint ? apiKey : apiKeyTransactional,
            appId: zkMeConfig.APP_ID,
            apiModePermission: zkMeConfig.apiModePermission,
            lv: zkMeConfig.lv,
        })
        if ((res.status === 200 || res.status === 201) && res.data && res.data.code && res.data.code === 80000000) {
            const accessToken = res.data.data.accessToken
            return response.status(200).json({ accessToken })
        } else {
            if ((res.status === 200 || res.status === 201) && res.data && res.data.code) {
                console.error("Error fetching access token: " + res.data.code + res.data.msg)
            }

            return response
                .status(400)
                .json({ error: 'Error calling zkme api' })
        }
    } catch (error: any) {
        return response.status(500).json({ error: 'Error getting ZKMe access token' })
    }
}
