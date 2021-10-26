import { QueueEvent, ViewFunc } from '../types'

export const gemTrailsView: ViewFunc = (
  projectId: number,
  projectTokenId: number,
  tokenId: number,
  event: QueueEvent
) => {
  const data: any = {
    repeat: 0,
    quality: 8,
    duration: 1,
    frameRate: 1,
    isPng: true,
    appendGif: false,
    test: false,
  }

  const sketch = (p: any) => {
    data.meta = {
      projectId,
      tokenId,
      projectTokenId,
      blockNumber: event.blockNumber,
      artist: 'Geoffrey Lillemon',
    }

    if (projectTokenId < 10) {
      data.meta.name = `Gem Trail 00${projectTokenId}`
    } else if (projectTokenId < 100) {
      data.meta.name = `Gem Trail 0${projectTokenId}`
    } else {
      data.meta.name = `Gem Trail ${projectTokenId}`
    }

    data.meta.collection = 'Gem Trails'
    data.meta.contract = process.env.CONTRACT
    data.meta.script =
      'https://github.com/DAOfi/node-worker/blob/main/src/views/gemTrails.ts'
    data.meta.description =
      'Gem Trails by Geoffrey Lillemon (b.1981 USA/Netherlands) is a generative dynamic system that produces unique vibrant compositions based on an atomic parameter determined at the time of minting. Color combinations and behavior are individually regulated by mathematical constructs from which mesmerizing arrangements emerge. The resulting impressionistic organic shapes and structures are the result of random explorations in code and careful selection by the artist. Each composition is built dynamically through a sequence of controlled chaotic events which produce colorful trails in their own distinctive metaphysical domain.\n\nThe artist advises C-print 84.67 cm x 67.73 cm @ 150 DPI when printing your NFT artwork.'
    data.meta.attributes = []
    data.meta.attributes.push({
      trait_type: 'Gem Trails',
      value: 'All Gem Trails',
    })

    let agents: any[],
      direction: number,
      colorOffset: number,
      colorGroups: number,
      colorSpread: number,
      colorOpacity: number,
      wobbleAmount: number,
      traits: any,
      landscapeVertices: any[],
      stepCount: number,
      resolutionWidth: number,
      resolutionHeight: number

    function randomColor(
      lightness = 60,
      theOpacity = colorOpacity,
      saturation = 70
    ) {
      return traits.darkMode && (traits.isMonoChromatic || p.random() < 0.8)
        ? `hsla(0, 0%, ${Math.floor(((lightness * 1) / 0.6) * 0.1 + 0)}%, 1)`
        : `hsla(${
            Math.round(
              colorOffset +
                Math.floor(p.random(colorGroups)) * (180 / colorGroups) +
                p.random(colorSpread)
            ) % 360
          },${saturation}%, ${lightness}%, ${theOpacity})`
    }

    function drawBackgroundShapes() {
      p.push()
      let originalColorOffset = colorOffset
      colorOffset += 180
      p.background(randomColor())
      p.translate(resolutionWidth / 2, resolutionHeight / 2)
      p.rotate(direction - Math.PI / 2)
      p.translate(-resolutionWidth / 2, -resolutionHeight / 2)
      const shapes = 0.2
      if (traits.isBackgroundCurvy) {
        for (let j = 0; j < shapes; j++) {
          p.fill(randomColor(50))
          p.noStroke()
          p.beginShape()
          let shapeX = -resolutionWidth
          p.curveVertex(shapeX, resolutionHeight * 2)
          p.curveVertex(shapeX, resolutionHeight * 2)
          const maxIncrease = p.random(2, 200)
          while (shapeX < resolutionWidth * 2) {
            shapeX += p.random(resolutionWidth / maxIncrease)
            p.curveVertex(shapeX, resolutionHeight * (j / shapes + p.random()))
          }
          p.curveVertex(shapeX, resolutionHeight * 2)
          p.curveVertex(shapeX, resolutionHeight * 2)
          p.endShape()
        }
      } else {
        for (let j = 0; j < shapes; j++) {
          p.fill(randomColor(50))
          p.noStroke()
          p.beginShape()
          let shapeX = -resolutionWidth
          p.vertex(shapeX, resolutionHeight * 2)
          p.vertex(shapeX, resolutionHeight * 2)
          const maxIncrease = p.random(2, 200)
          while (shapeX < resolutionWidth * 2) {
            shapeX += p.random(resolutionWidth / maxIncrease)
            p.vertex(shapeX, resolutionHeight * (j / shapes + p.random()))
          }
          p.vertex(shapeX, resolutionHeight * 2)
          p.vertex(shapeX, resolutionHeight * 2)
          p.endShape()
        }
      }
      p.pop()
      colorOffset = originalColorOffset
    }

    function drawLandscape() {
      let originalColorOffset = colorOffset
      colorOffset += 90
      const direction = p.random(-0.2, 0.2) + Math.PI / 2
      p.push()
      p.translate(resolutionWidth / 2, resolutionHeight / 2)
      p.rotate(direction - Math.PI / 2)
      p.translate(-resolutionWidth / 2, -resolutionHeight / 2)
      const shapes = 1
      if (!landscapeVertices) {
        landscapeVertices = []

        let shapeX = -resolutionWidth
        const maxIncrease = p.random(400, 600)
        data.meta.attributes.push({
          trait_type: 'Gem Trails',
          value: `HyperGraphicShards: ${maxIncrease}`,
        })
        while (shapeX < resolutionWidth * 2) {
          shapeX += p.random(resolutionWidth / maxIncrease)
          landscapeVertices.push([
            shapeX,
            resolutionHeight * p.random(0.7, 0.75),
          ])
        }
      }
      if (traits.isBackgroundCurvy) {
        for (let j = 0; j < shapes; j++) {
          p.fill(randomColor(Math.floor(stepCount / 7) + 30))
          p.noStroke()
          p.beginShape()
          let shapeX = -resolutionWidth
          p.curveVertex(shapeX, resolutionHeight * 2)
          p.curveVertex(shapeX, resolutionHeight * 2)
          landscapeVertices.forEach((vertex) => {
            p.curveVertex (
              vertex[0],
              (stepCount * resolutionHeight) / 600 + vertex[1]
            )
          })
          p.curveVertex(shapeX, resolutionHeight * 2)
          p.curveVertex(shapeX, resolutionHeight * 2)
          p.endShape()
        }
      } else {
        for (let j = 0; j < shapes; j++) {
          p.fill(randomColor(Math.floor(stepCount / 7) + 30))
          p.noStroke()
          p.beginShape()
          let shapeX = -resolutionWidth
          p.vertex(shapeX, resolutionHeight * 2)
          p.vertex(shapeX, resolutionHeight * 2)
          landscapeVertices.forEach((vertex) => {
            p.vertex (
              vertex[0],
              (stepCount * resolutionHeight) / 600 + vertex[1]
            )
          })
          p.vertex(shapeX, resolutionHeight * 2)
          p.vertex(shapeX, resolutionHeight * 2)
          p.endShape()
        }
      }
      p.pop()
      colorOffset = originalColorOffset
    }

    function init() {
      colorGroups = traits.isMonoChromatic ? 1 : Math.floor(p.random(2, 4))
      colorOffset = p.random(360)
      colorSpread = traits.isMonoChromatic ? 10 : p.random(90)
      colorOpacity = 1

      stepCount = 0

      direction =
        Math.PI / 2 + p.random(-0.4, 0.4) + (traits.goesDown ? 0 : Math.PI)
      wobbleAmount = traits.isStraight ? 0 : 2

      drawBackgroundShapes()
      drawLandscape()

      agents = []
      const amountOfTrails = 32
      for (let i = 0; i < amountOfTrails; i++) {
        let n = 200
        const vertexes = []
        for (let k = 0; k < n; k++) {
          vertexes.push(p.random())
        }
        agents.push({
          age: 0,
          mushroomness: p.random(),
          size: 1,
          x: traits.fromCenter ? 1 / 2 : p.random(-0.25, 1.25),
          y: traits.fromCenter
            ? traits.goesDown
              ? 0
              : 1
            : p.random(1) - 1 * Math.sin(direction),
          dx: Math.cos(traits.fromCenter ? p.random(Math.PI * 2) : direction),
          dy: Math.sin(traits.fromCenter ? p.random(Math.PI * 2) : direction),
          taper: p.random(0.004, 0.005),
          vertexes,
          rotation: p.random(-1, 1),
          speed: 0.0065,
        })
      }
    }

    function drawGemTrails() {
      agents.forEach((agent) => {
        let distance = agent.speed * agent.size
        if (agent.dead) {
          distance *= agent.mushroomness < 0.5 ? 0 : 1
        }
        agent.size -= agent.dead ? agent.taper * 5 : agent.taper
        if (agent.size < 0.01) {
          if (agent.dead) {
            return
          }
          distance = agent.speed
          agent.dead = true
          if (p.random() < 0.3 || traits.isMonoChromatic) {
            agent.size = 0
            return
          }
          agent.size = p.random(0.5, 0.75)
        }
        const wobbleDirection = p.random(Math.PI * 2)
        const currentWobbleAmount = agent.dead ? 0 : wobbleAmount
        agent.y +=
          distance *
          (agent.dy + Math.cos(wobbleDirection) * currentWobbleAmount)
        agent.x +=
          distance *
          (agent.dx + Math.sin(wobbleDirection) * currentWobbleAmount)
        agent.age += 1
        const lightness =
          (1 - agent.size) * Math.min(1, agent.age / 100) * 50 +
          p.random(10) +
          10

        let originalColorOffset = colorOffset
        if (agent.dead) colorOffset += 280
        p.fill(randomColor(Math.max(0, lightness), 1))
        p.noStroke()
        colorOffset = originalColorOffset
        let n = agent.vertexes.length
        p.push()
        p.translate(agent.x * resolutionWidth, agent.y * resolutionHeight)
        p.rotate(agent.age * agent.rotation * wobbleAmount * 0.1)
        p.beginShape()

        if (traits.areTrailGemsCurvy) {
          agent.vertexes.forEach((v: any, k: any) => {
            const d = agent.size * (v + 1) * 0.04
            p.curveVertex(
              d * p.cos((p.TWO_PI / n) * k) * resolutionHeight,
              d * p.sin((p.TWO_PI / n) * k) * resolutionHeight
            )
          })
        } else {
          agent.vertexes.forEach((v: any, k: any) => {
            const d = agent.size * (v + 1) * 0.04
            p.vertex(
              d * p.cos((p.TWO_PI / n) * k) * resolutionHeight,
              d * p.sin((p.TWO_PI / n) * k) * resolutionHeight
            )
          })
        }
        p.endShape(p.CLOSE)
        p.pop()
      })
    }

    function drawFrame() {
      p.noFill()
      p.stroke('#eee')
      p.strokeWeight(Math.max(resolutionWidth, resolutionHeight) * 0.041)
      p.rect(0, 0, resolutionWidth, resolutionHeight)

      p.noFill()
      p.stroke('#fff')
      p.strokeWeight(Math.max(resolutionWidth, resolutionHeight) * 0.04)
      p.rect(0, 0, resolutionWidth, resolutionHeight)

      p.noFill()
      p.stroke('#eee')
      p.strokeWeight(Math.max(resolutionWidth, resolutionHeight) * 0.001)
      p.rect(0, 0, resolutionWidth, resolutionHeight)
    }

    function step() {
      stepCount += 1

      drawGemTrails()
      drawLandscape()
      drawFrame()
    }

    p.setup = () => {
      data.meta.seed = event.blockNumber * tokenId
      p.randomSeed(data.meta.seed)

      resolutionWidth = 5000
      resolutionHeight = 4000
      data.canvas = p.createCanvas(resolutionWidth, resolutionHeight)
      console.log('Resolution:')
      console.log(`${resolutionWidth} × ${resolutionHeight}`)
      console.log('~^~^~^~^~^~^~^~^~^~^~')

      traits = {
        fromCenter: p.random() < 0.05,
        isBackgroundCurvy: p.random() < 0.4,
        areTrailGemsCurvy: p.random() < 0.2,
        isMonoChromatic: p.random() < 0.1,
        isStraight: p.random() < 0.1,
        goesDown: p.random() < 0.2,
        darkMode: p.random() < 0.1,
      }
      data.meta.attributes.push({
        trait_type: 'Gem Trails',
        value: `MidnightStrike: ${traits.isMonoChromatic}`,
      })
      data.meta.attributes.push({
        trait_type: 'Gem Trails',
        value: `CurvatureTensionWeave: ${traits.areTrailGemsCurvy}`,
      })
      data.meta.attributes.push({
        trait_type: 'Gem Trails',
        value: `SymbioticCurveGeometrics: ${traits.isBackgroundCurvy}`,
      })
      console.log('Traits:')
      Object.entries(traits).forEach(([trait, value]) =>
        console.log(trait, value)
      )
      console.log('~^~^~^~^~^~^~^~^~^~^~')

      init()
      while (agents.some((agent) => agent.size > 0.001)) {
        step()
      }

      console.log('Done')
      console.log(`${stepCount} steps`)
      data.meta.attributes.push({
        trait_type: 'Gem Trails',
        value: `SharkToothDissection: ${stepCount}`,
      })

      console.log('~^~^~^~^~^~^~^~^~^~^~')
    }

    p.draw = () => {}
  }

  return {
    data,
    sketch,
  }
}
