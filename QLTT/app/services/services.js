function Services () {
    this.fetchData = function () {
        return axios({
            url: 'https://625d76f54c36c7535775686d.mockapi.io/api/Products',
            method: 'GET'
        })
    }

    this.deleteUserById = function (id) {
        return axios({
            url: `https://625d76f54c36c7535775686d.mockapi.io/api/Products/${id}`,
            method: 'DELETE'
        })
    }

    this.addUser = function (user) {
        return axios({
            url: 'https://625d76f54c36c7535775686d.mockapi.io/api/Products',
            method: 'POST',
            data: user
        })
    }

    this.updateUserById = function (id, user) {
        return axios({
            url: `https://625d76f54c36c7535775686d.mockapi.io/api/Products/${id}`,
            method: 'PUT',
            data: user
        })
    }
}