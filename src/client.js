import axios from "axios";

/**
 * Create a new Axios client instance
 * @see https://github.com/mzabriskie/axios#creating-an-instance
 */
const getClient = (baseUrl = null) => {
  const options = {
    baseURL: baseUrl
  };

  //if (store.getters['users/isAuthenticated']) {
  //  options.headers = {
  //    Authorization: `Bearer ${store.getters['users/accessToken']}`,
  //  };
  //}

  const client = axios.create(options);

  // Add a request interceptor
  client.interceptors.request.use(
    requestConfig => requestConfig,
    requestError => {
      //Raven.captureException(requestError);

      return Promise.reject(requestError);
    }
  );

  // Add a response interceptor
  client.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status >= 500) {
        //Raven.captureException(error);
      }

      if (error.response.status == 401) {
        return Promise.reject(error);
      }

      return Promise.reject(error);
    }
  );

  return client;
};

class ApiClient {
  constructor(baseUrl = null) {
    this.client = getClient(baseUrl);
  }

  get(url, conf = {}) {
    return this.client
      .get(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  delete(url, conf = {}) {
    return this.client
      .delete(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  head(url, conf = {}) {
    return this.client
      .head(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  options(url, conf = {}) {
    return this.client
      .options(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  post(url, data = {}, conf = {}) {
    return this.client
      .post(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  put(url, data = {}, conf = {}) {
    return this.client
      .put(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  patch(url, data = {}, conf = {}) {
    return this.client
      .patch(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }
}

export { ApiClient };

const ghClient = new ApiClient("https://api.github.com");

export default {
  profile(username) {
    return ghClient
      .get("users/" + username)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  repos(username) {
    return ghClient
      .get("users/" + username + "/repos")
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  readme(username, repo) {
    return ghClient
      .get("repos/" + username + "/" + repo + "/readme")
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }
};

/**
 * Base HTTP Client
 */
// export default {
//   ghClient: getClient("https://api.github.com"),
//
//   // Provide request methods with the default base_url
//   get(url, conf = {}) {
//     return getClient().get(url, conf)
//       .then(response => Promise.resolve(response))
//       .catch(error => Promise.reject(error));
//   },
//
//   delete(url, conf = {}) {
//     return getClient().delete(url, conf)
//       .then(response => Promise.resolve(response))
//       .catch(error => Promise.reject(error));
//   },
//
//   head(url, conf = {}) {
//     return getClient().head(url, conf)
//       .then(response => Promise.resolve(response))
//       .catch(error => Promise.reject(error));
//   },
//
//   options(url, conf = {}) {
//     return getClient().options(url, conf)
//       .then(response => Promise.resolve(response))
//       .catch(error => Promise.reject(error));
//   },
//
//   post(url, data = {}, conf = {}) {
//     return getClient().post(url, data, conf)
//       .then(response => Promise.resolve(response))
//       .catch(error => Promise.reject(error));
//   },
//
//   put(url, data = {}, conf = {}) {
//     return getClient().put(url, data, conf)
//       .then(response => Promise.resolve(response))
//       .catch(error => Promise.reject(error));
//   },
//
//   patch(url, data = {}, conf = {}) {
//     return getClient().patch(url, data, conf)
//       .then(response => Promise.resolve(response))
//       .catch(error => Promise.reject(error));
//   },
// };
