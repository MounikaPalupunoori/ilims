
import axios from 'axios'

export const TokenService = new (class {
    constructor() {
    }
    async getValidityToken(params) {
      try {
        const headerConfig = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${params}`
            }
          }
            const response = await axios.get(
              `${import.meta.env.VITE_ICORE_CONSOLE}/platform/api/v1/tokenCheck`,
              headerConfig
            )
             return response.status
            
      } catch (error) {
        localStorage.clear()
        window.location.href = import.meta.env.VITE_ICORE_CONSOLE     
      }
    }
   })();