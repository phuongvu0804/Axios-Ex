function Services () {
    this.fetchData = function () {
        return axios({
            url: 'https://625d76f54c36c7535775686d.mockapi.io/api/Products',
            method: 'GET'
        })
    }
}