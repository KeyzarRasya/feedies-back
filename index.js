const Feedies = require('./Feedies')

const feedies = new Feedies();


async function main(){
    await feedies.connect({
        apiKey:'FEEDIES-HeNtZpLzWaTnXxXmJxKdWgHjNkNwRw'
    })

    await feedies.send({
        sender:'KeyzarRasya',
        feedback:'wah aplikasi ini bagus sekali!!!'
    })
}

main();