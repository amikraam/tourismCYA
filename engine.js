const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const imageElement = document.getElementById('image')

let state = {}

function startGame(){
 state = {}
 showTextNode(1)
}

function showTextNode(textNodeIndex){
    const textNode = textNodes.find(textNode=>textNode.id === textNodeIndex)
    imageElement.src=textNode.image
    textElement.innerText = textNode.text
    while(optionButtonsElement.firstChild){
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option=>{
        if(showOption(option)){
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', ()=>selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option){
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option){
    const nextTextNodeId = option.nextText
    if(nextTextNodeId<=0){
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes=[
    {
        id:1,
        image:'bg/start.jpg',
        text: 'You wake up, washed ashore on an unknown island. It seems deserted and you feel like you should try and find ways to get off the island. Exploring would be the best option, but where to start?',
        options:[
            {
                text:'Explore the beach',
                setState:{beach:true},
                nextText: 3
            },
            {
                text:'Go into the nearby jungle',
                setState:{beach:true},
                nextText: 17
            }
        ]
    },
    {
        id:2,
        image:'bg/islandStart.jpg',
        text:'You’ve ended up right back where you started. You’re not sure where to go next, but you’re going to have to decide at some pointYou decided to look around the beach. The cool, white sands and the sound of the crashing waves create a sense of relaxation. Maybe you can afford to sit back, relax, and enjoy the view, even if just for a moment',
        options:[
            {
                text:'Go to the beach',
                requiredState: (currentState)=>currentState.beach,
                nextText: 3
            },{
                text:'Go to the beach',
                requiredState: (currentState)=>currentState.hornbill,
                nextText: 6
            },{
                text:'Go to the beach',
                requiredState: (currentState)=>currentState.kayak,
                nextText: 9
            },{
                text:'Go to the jungle',
                requiredState: (currentState)=>!currentState.ruins || !currentState.hornbill,
                nextText: 17
            },{
                text:'Go to the jungle',
                requiredState: (currentState)=>currentState.ruins && currentState.hornbill,
                nextText: 23
            }
        ]
    },
    {
        id:3,
        image:'bg/beach3.jpg',
        text:'You ended up going to the beach. You spot a lone tree',
        options:[
            {
                text:'Approach the tree',
                nextText: 4
            },{
                text:'Go somewhere else',
                nextText: 2
            }
        ]
    },{
        id:4,
        image:'bg/hornbill.jpg',
        text: 'On the tree, you see a strange bird. It has a crescent beak and a strange crown on its head. Your passing knowledge of the animal kingdom identifies it as a hornbill. It doesn’t seem to be interested in you right now. Perhaps you can get its attention by offering something?',
        options:[
            {
                text:'Feed it',
                requiredState: (currentState)=>currentState.banana,
                setState:{banana: false},
                nextText: 5
            },{
                text:'Go somewhere else',
                nextText: 2
            }
        ]
    },{
        id:5,
        image:'bg/hornbill3.jpg',
        text: 'The hornbill seems delighted at your offering and munched on the food happily. Once it was satisfied, it gently pecked you, as if urging you to follow it somewhere. What will you do?',
        options:[
            {
                text:'Follow the hornbill',
                nextText: 7
            },{
                text:'Go somewhere else',
                setState:{hornbill:true, beach:false},
                nextText: 2
            }
        ]
    },{
        id:6,
        image:'bg/hornbill.jpg',
        text: 'It seems like the hornbill has been patiently waiting for you since you last came. You are impressed at how long it was waiting. Maybe you should consider seeing what it wants',
        options:[
            {
                text:'Follow the hornbill',
                nextText: 7
            },{
                text:'Go somewhere else',
                setState:{hornbill:true, beach:false},
                nextText: 2
            }
        ]
    },{
        id:7,
        image:'bg/hornbill2.jpg',
        text: 'The hornbill spread its majestic wings and took flight once it sensed your willingness to follow it. They’re smarter than what they let on',
        options:[
            {
                text:'Next',
                nextText: 8
            }
        ]
    },{
        id:8,
        image:'bg/seaCave2.jpg',
        text: 'Following the hornbill, you ended up near a sea cave of sorts. Near the entrance of the cave, there seems to be a makeshift raft made of wood. You’re not sure how it ended up here, but this may be your way of getting off this island',
        options:[
            {
                text:'Get on the raft',
                nextText: 10
            },{
                text:'Go somewhere else',
                setState:{kayak:true, hornbill:false},
                nextText: 2
            }
        ]
    },{
        id:9,
        image:'bg/seaCave2.jpg',
        text: 'Wandering around, you ended up back at the sea cave. The raft is still in good condition, so maybe it will survive the seas?',
        options:[
            {
                text:'Get on the raft',
                nextText: 10
            },{
                text:'Go somewhere else',
                setState:{kayak:true, hornbill:false},
                nextText: 2
            }
        ]
    },{
        id:10,
        image:'bg/seaCave.jpg',
        text: 'You decide to get on the raft and go into the sea cave. The cave interior is surprisingly pristine. The jutting rocks create a beautiful formation that no man can possibly replicate. As you go further into the cave, you notice that the currents have started to get stronger. There’s still time to turn back, but going further in might be a way to freedom?',
        options:[
            {
                text:'Go further',
                nextText: 11
            },{
                text: 'Go back',
                nextText: 2
            }
        ]
    },{
        id:11,
        image:'bg/seaCave3.jpg',
        text: 'You decide to ride the currents and let it take you wherever it deems necessary. It’s a large risk going onto the current, but it’s better than being stuck on the island.',
        options:[
            {
                text:'Next',
                nextText: 12
            }
        ]
    },{
        id:12,
        image:'bg/coral.jpg',
        text: 'The rapids made for a bumpy ride, but your raft miraculously survived the journey. You end up at a clear beautiful sea. You see strange looking rocks beneath the crystal clear waters.',
        options:[
            {
                text:'Examine the rocks',
                nextText: 13
            },{
                text: 'Press on',
                nextText: 14
            }
        ]
    },{
        id:13,
        image:'bg/coral2.jpg',
        text: 'You decide to take a quick dive to check out the rocks. Turns out those are no ordinary rocks, they are corals! You gaze in awe as the wildlife around the coral swim about. You take a few more diving trips to see the corals in its entirety. Satisfied with the view, you feel like it’s time to move forward.',
        options:[
            {
                text: 'Next',
                nextText: 14
            }
        ]
    },{
        id:14,
        image:'bg/boat.jpg',
        text: 'In the distance, you see a passing ship! You wave and scream as loud as you can, hoping to catch its attention. Luckily, you do, and the ship turns toward you.',
        options:[
            {
                text:'You’re saved!',
                nextText: 15
            }
        ]
    },{
        id:15,
        image:'bg/boat2.jpg',
        text: 'Your experience on the island was brief, but you felt like it was a memorable little adventure. As you head back to civilization, you feel that deep down, you wouldn’t mind going back to see what else was on the island.',
        options:[
            {
                text:'Next',
                nextText: 16
            }
        ]
    },{
        id:16,
        image:'bg/pangkor.jpg',
        text: 'Based on your actions, you may be interested in visiting Pangkor Island! Some of the things you can do there are hornbill feeding, coral diving, and going on boat rides!',
        options:[
            {
                text:'Restart',
                nextText: -1
            }
        ]
    },{
        id:17,
        image:'bg/banana.jpg',
        text: 'You decide to venture into the jungle. The first thing you see is a banana tree',
        options:[
            {
                text:'Take banana',
                requiredState: (currentState)=>!currentState.banana,
                setState:{banana: true},
                nextText: 18
            },{
                text:'Ignore the banana tree',
                requiredState: (currentState)=>!currentState.ruins,
                nextText: 19
            },{
                text:'Ignore the banana tree',
                requiredState: (currentState)=>currentState.ruins,
                nextText: 23
            }
        ]
    },{
        id:18,
        image:'bg/banana2.jpg',
        text: 'You take a banana. Maybe it will be useful on your adventure',
        options:[
            {
                text:'Go back',
                nextText: 2
            },{
                text:'Continue further into the jungle',
                requiredState: (currentState)=>!currentState.ruins,
                nextText: 19
            },{
                text:'Continue further into the jungle',
                requiredState: (currentState)=>currentState.ruins,
                nextText: 23
            }
        ]
    },{
        id:19,
        image:'bg/ruin.jpg',
        text: 'You don’t know how long you’ve been going at it, but you eventually reached some kind of ruin. It might be dangerous, but you find it hard to ignore your sense of curiosity',
        options:[
            {
                text:'Go to the ruins',
                nextText: 20
            },{
                text:'Turn back',
                nextText: 2
            }
        ]
    },{
        id:20,
        image:'bg/nandi.jpg',
        text: 'A bull statue welcomes your arrival. Its large size is imposing, but you feel at ease. The style of the statue suggests this might be of Hindu origin, but you’re not sure.',
        options:[
            {
                text:'Go closer',
                nextText: 21
            },{
                text:'Turn back',
                nextText: 2
            }
        ]
    },{
        id:21,
        image:'bg/plate.jpeg',
        text: 'Closer inspection reveals a large offering plate placed in front of the bull statue. Maybe you could put something there',
        options:[
            {
                text:'Place banana',
                requiredState: (currentState)=>currentState.banana,
                setState:{banana: false},
                nextText: 22
            },{
                text:'Turn back',
                nextText: 2
            }
        ]
    },{
        id:22,
        image:'bg/ruinEntrance.jpg',
        text: 'The ground shakes as you place the banana on the plate, revealing an entrance to the ruins. It might be dangerous, but at the same time, you’re excited to see what’s inside',
        options:[
            {
                text:'Go in',
                nextText: 24
            },{
                text:'Leave',
                setState:{ruins: true},
                nextText: 2
            }
        ]
    },{
        id:23,
        image:'bg/ruinEntrance.jpg',
        text: 'You’ve ended up back at the ruin entrance. Thinking about what you may find inside fills you with a great sense of curiosity. Maybe it can help answer some questions about the origins of this island as well',
        options:[
            {
                text:'Go in',
                nextText: 24
            },{
                text:'Leave',
                nextText: 2
            }
        ]
    },{
        id:24,
        image:'bg/ruinInterior.jpg',
        text: 'The inside of the ruin is surprisingly well lit. You’re not sure how this is achieved, but you want to get to the bottom of this. Then, you notice a shining object on the floor',
        options:[
            {
                text:'Examine the object',
                setState:{idol: true},
                nextText: 25
            },{
                text:'Ignore the object',
                nextText: 26
            }
        ]
    },{
        id:25,
        image:'bg/idol.jpg',
        text: 'Picking up the object reveals that it is some form of idol sculpture. The pattern and design is similar to the bull statue. Perhaps this is also of Hindu origin.',
        options:[
            {
                text:'Next',
                nextText: 26
            }
        ]
    },{
        id:26,
        image:'bg/buddha.jpg',
        text: 'Going further into the ruin, you see a large statue. You instantly recognise the Buddhist features of the statue. Perhaps this island was part of a long lost ancient civilization? You notice a suspiciously empty altar in front of the Buddhist statue. Perhaps you can place something on it?',
        options:[
            {
                text:'Place idol',
                requiredState: (currentState)=>currentState.idol,
                setState:{idol: false},
                nextText: 27
            },{
                text:'Turn back',
                nextText: 2
            }
        ]
    },{
        id:27,
        image:'bg/ruin2.jpg',
        text: 'You placed the idol you found on the altar. Before you could gather your thoughts on other possible theories about the origin of this area, the ground begins to tremble and parts of the ceiling begin to fall. The ruin is collapsing!',
        options:[
            {
                text:'Escape',
                nextText: 28
            }
        ]
    },{
        id:28,
        image:'bg/jungle.jpg',
        text: 'You barely made it out of the ruins as it collapsed. Perhaps the act of opening the structure was too much, resulting in its destruction',
        options:[
            {
                text:'Leave',
                nextText: 29
            }
        ]
    },{
        id:29,
        image:'bg/plane.jpg',
        text: 'As you look at the sky, you see a plane passing by. This may be your chance to be saved, but you don’t know how to get the attention of the plane. Suddenly, a brightly shining light appeared from the ruins, acting as a beacon. The plane, noticing this, heads towards your location',
        options:[
            {
                text:'You’re saved!',
                nextText: 30
            }
        ]
    },{
        id:30,
        image:'bg/plane2.jpg',
        text: 'Your experience on the island was brief, but you felt like it was a memorable little adventure. As you head back to civilization. You’re not sure why there was light coming out of the ruins, nor are you sure about the origins of the island, but one this is for sure, you don’t mind coming back to uncover this island’s origins',
        options:[
            {
                text:'Next',
                nextText: 31
            }
        ]
    },{
        id:31,
        image:'bg/bujang.jpg',
        text:'Based on your actions, you may be interested in Bujang Valley! This is an ancient archeological site containing various artifacts of Hindu and Buddhist origin.',
        options:[
            {
                text:'Restart Game',
                nextText: -1
            }
        ]
    }
]

startGame()