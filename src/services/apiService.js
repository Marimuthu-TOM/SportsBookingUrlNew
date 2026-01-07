// Get API base URL from environment or window location
const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost'

const apiUrl = 'https://gateway.stage.theonemoment.co/'
// const apiUrl = isLocalhost
//   ? 'https://gateway.stage.theonemoment.co/'
//   : 'https://gateway.theonemoment.co/'

// Generic HTTP request handler
const apiRequest = async (endpoint, method = 'GET', data = null, headers = {}) => {
  try {
    const url = `${apiUrl}${endpoint}`

    const config = {
      method,
      // credentials: 'include', // fetch equivalent of withCredentials
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    }

    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      config.body = JSON.stringify(data)
    }

    const response = await fetch(url, config)

    // Handle non-OK responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const error = new Error(errorData.message || `API Error: ${response.status}`)
      error.status = response.status
      error.data = errorData
      throw error
    }

    const responseData = await response.json()
    return responseData
  } catch (error) {
    console.error(`API Request Error (${endpoint}):`, error)
    throw error
  }
}

// ============ Generic HTTP Methods ============

export const apiGet = (endpoint, headers = {}) => {
  return apiRequest(endpoint, 'GET', null, headers)
}

export const apiPost = (endpoint, data, headers = {}) => {
  return apiRequest(endpoint, 'POST', data, headers)
}

export const apiPut = (endpoint, data, headers = {}) => {
  return apiRequest(endpoint, 'PUT', data, headers)
}

export const apiPatch = (endpoint, data, headers = {}) => {
  return apiRequest(endpoint, 'PATCH', data, headers)
}

export const apiDelete = (endpoint, headers = {}) => {
  return apiRequest(endpoint, 'DELETE', null, headers)
}

// ============ Export base URL for reference ============
export const getApiUrl = () => apiUrl

export default {
  // Generic methods
  apiGet,
  apiPost,
  apiPut,
  apiPatch,
  apiDelete,
  getApiUrl,
}
