import { useEffect, useMemo, useRef, useState } from "react"
import { networkGraphClasses } from "../../theme/networkGraphClasses";
import { useInterval, useList, useWindowSize } from "react-use";
import { uniqueNamesGenerator, names } from "unique-names-generator";
import useTypedStyles from "../../hooks/useTypedStyles";

const betterNames = names.flatMap(x => [x, `${x}_${2 + Math.floor(Math.random() * 100)}`, `${x}${2 + Math.floor(Math.random() * 100)}`])
const numberOfConnections = 3
export const NetworkGraphVisualization = () => {
    const { width, height } = useWindowSize();

    const adjustedHeight = Math.max(height + 1, 855);

    const trueWithProbability = (probability: number) =>{
        return Math.random() < probability
    }

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const createNode = () => ({
        id: Math.random().toString(),
        cx: Math.random() * width,
        cy: Math.random() * adjustedHeight,
        r: Math.random() * 17,
        velocityX: (Math.random() - 0.5) * 7,
        velocityY: (Math.random() - 0.5) * 7,
        name: uniqueNamesGenerator({ dictionaries: [betterNames], style: 'lowerCase' })
    })

    const [nodes, setNodes] = useList(Array.from(Array(100).keys()).map(createNode));

    const newVelocity = (previousVelocity: number) => {
        return (previousVelocity + (Math.random() - 0.5)*0.7) % 2.5
    }

    const createRandomNodes = () => {
        const numberOfNodesToCreate = Math.floor(Math.random() * 2);
        return Array.from(Array(numberOfNodesToCreate).keys()).map(createNode)
    }
    const destroyRandomNodes = () => {
        const numberOfNodesToDelete = Math.floor(Math.random() * 2);
        return Array.from(Array(numberOfNodesToDelete).keys()).map(() => Math.floor(Math.random() * nodes.length))
    }

    useInterval(() => {
        let deleteIndexes: number[] = [];
        let createNodes: typeof nodes = []
        if (trueWithProbability(0.25))
            createNodes = createRandomNodes();
        if (trueWithProbability(0.25))
            deleteIndexes = destroyRandomNodes();
        setNodes.set([...nodes.map(x => ({ ...x, cx: Math.abs((x.cx + x.velocityX) % width), cy: Math.abs((x.cy + x.velocityY) % adjustedHeight), velocityX: newVelocity(x.velocityX), velocityY: newVelocity(x.velocityY) }))
            .filter((_, i) => !deleteIndexes.includes(i)), ...createNodes]
        )
    }, 20)

    const connections = useMemo(() => {
        return nodes.flatMap((node, index) => { 
            const nodeDif = (nodeA: (typeof nodes)[0], nodeB: (typeof nodes)[0]) => {
                return Math.pow(nodeA.cx - nodeB.cx, 2) + Math.pow(nodeA.cy - nodeB.cy, 2)
            }
            return nodes.map((x, ind) => ({ ...x, index: ind, diff: nodeDif(x, node) }))
                    .filter(x => x.index !== index)
                    .sort((a, b) => a.diff - b.diff)
                    .slice(0, numberOfConnections )
                    .map(x=> ({start: index, end:x.index}))
        }).map(connection => {
            const startNode = nodes[connection.start];
            const endNode = nodes[connection.end]
            return {
                x1: startNode.cx, y1: startNode.cy, x2: endNode.cx, y2: endNode.cy
            }
        })
    }, [nodes])

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.beginPath();
        ctx.rect(0, 0, width + 1, adjustedHeight + 1);
        ctx.fillStyle = "#010117";
        ctx.fill();
        nodes.forEach(node => {
            ctx.beginPath();
            ctx.arc(node.cx, node.cy, node.r, 0, Math.PI * 2, false);
            ctx.fillStyle = 'aliceblue';

            ctx.fill();
            ctx.font = '"Lucida Console", monospace'
            ctx.fillStyle = "#00FF41";
            ctx.fillText(node.name, node.cx, node.cy)
        });
        connections.forEach(connection => {
            ctx.beginPath();
            ctx.moveTo(connection.x1, connection.y1);
            ctx.lineTo(connection.x2, connection.y2);
            ctx.strokeStyle = 'aliceblue';
            ctx.stroke();
        });
    }, [nodes, width, adjustedHeight, connections])

    const classes = useTypedStyles(networkGraphClasses);

    const staticClasses = useMemo(()=>classes, [])

    return <canvas
        ref={canvasRef}
        width={width}
        height={adjustedHeight}
        className={staticClasses.plane}
    />;
}