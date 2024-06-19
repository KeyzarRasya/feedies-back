const {v4:uuid} = require('uuid');
const axios = require('axios')

function Feedies({apiKey}){
	let isConnected = false;
	let connectionId = "";
	this.connect = async({apiKey}) => {
        try {
			if(isConnected){
				console.error('the connection is still open');
				return;
			}
            const response = await axios.post('http://localhost:4000/business/connect', {
                apiKey: apiKey
            });
            if (response.data.status !== 200) {
                console.error("Program error");
                return;
            }
            isConnected = true;
			connectionId = response.data.connectionId;
			console.log(connectionId);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    }

	this.disconnect = async() => {
		try{
			console.log(connectionId)
			const response = await axios.post('http://localhost:4000/business/disconnect', {
				connectionId:connectionId
			})
			if(response.data.status !== 200){
				console.error(response.data);
				return;
			}
			console.log(response.data.message)
			isConnected = false
			connectionId = "";
		}catch(err){
			console.error('Error:', error.response ? error.response.data : error.message);
		}
	}

	this.send = async({sender, feedback}) => {
		try{
			await this.connect({apiKey:apiKey});
			if(!isConnected){
				console.error('Connection closed, open it to make a request');
				return;
			}
			const response = await axios.post('http://localhost:4000/feedback/send',{
				sender,
				feedback,
				connectionId
			})
			if(response.data.status !== 200){
				throw new Error(response.data.message)
			}
			return {status:200, message:response.data.message};
		}catch(err){
			console.error(err.message);
		}
	}

	this.getConnectionId = () => {
		return connectionId;
	}

}

module.exports = Feedies;
