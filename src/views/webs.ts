import { QueueEvent, ViewFunc } from '../types'

export const websView: ViewFunc = (
  projectId: number,
  projectTokenId: number,
  tokenId: number,
  event: QueueEvent
) => {
  const data: any = {
    repeat: 0,
    quality: 10,
    duration: 1,
    frameRate: 30,
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
      artist: 'Jessica Hang',
    }

    if (projectTokenId < 10) {
      data.meta.name = `SITE of WEBS 000${projectTokenId}`
    } else if (projectTokenId < 100) {
      data.meta.name = `SITE of WEBS 00${projectTokenId}`
    } else if (projectTokenId < 1000) {
      data.meta.name = `SITE of WEBS 0${projectTokenId}`
    } else {
      data.meta.name = `SITE of WEBS ${projectTokenId}`
    }

    data.meta.collection = 'SITE of WEBS'
    data.meta.contract = process.env.CONTRACT
    data.meta.script =
      'https://github.com/DAOfi/node-worker/blob/main/src/views/webs.ts'
    data.meta.description =
      'SITE of WEBS is a generative artwork using 4 chambers of multifaceted properties. The work was created on a tropical island as a collaboration between a visual artist and an aerospace engineer.  The script invokes patterns and networks - simultaneously biological and technological - with both diffusive and concentrated qualities embodied by smoke, clouds, vapor, and human migratory patterns. Spiderwebs and people moving through the city or across greater expanses of time and space leave invisible tracks which form intricate networks with self-discovering moments of density and sparsity.   The script is a deliberately written instrument where each mint generates and makes visual these organic processes of intricate patterning which emerge from the seed of intentionality.\n\nJessica Hang (b. 1991 Chinatown, Los Angeles) is an artist living and working in Taiwan. She has exhibited her works internationally and is the recipient of multiple honors and awards. She has a degree in Fine Arts from the University of Southern California and is a co-director of the artist-run space Mother Culture.'
    data.meta.attributes = []
    data.meta.attributes.push({
      trait_type: 'SITE of WEBS',
      value: 'All SITE of WEBS',
    })

    data.meta.seed = event.blockNumber * tokenId
    p.randomSeed(data.meta.seed)

    const width = 400
    const height = 600
    const pause_frames = [21, 69, 175, 300, 600]
    const pause_frame = p.random(pause_frames)
    data.duration = Math.ceil(pause_frame / data.frameRate)
    // console.log('pause frame:', pause_frame)
    data.meta.attributes.push({
      trait_type: 'SITE of WEBS',
      value: `Frames: ${pause_frame}`,
    })

    //*** BG at random selection
    const backgrounds = [
      'bg1_light',
      'bg1_dark',
      'bg2_light',
      'bg2_dark',
      'bg3_light',
      'bg3_dark',
      'bg4_light',
      'bg4_dark',
      'bg5_dark',
      'bg6_light',
      'bg6_dark',
    ]
    const selected_background = p.random(backgrounds)
    let bgFunc = () => {}
    let bMode: any,
      bModes: any[] = []
    let line1_hus: number[][] = [],
      line1_brts: number[][] = [],
      line1_sats: number[][] = [],
      line1_alphs: number[][] = [],
      line2_hus: number[][] = [],
      line2_brts: number[][] = [],
      line2_sats: number[][] = [],
      line2_alphs: number[][] = []
    let bg_hu, bg_brt, bg_sats, bg_sat_range, bg_sat
    let rand_x1 = p.random(0, 200)
    let rand_x2 = p.random(0, 100)
    let rand_x3 = p.random(301, 400)
    let rand_y1 = p.random(0, 100)
    let rand_y2 = p.random(401, 600)
    let rand_y3 = p.random(401, 600)

    //*** Lines at random
    if (selected_background === 'bg1_light') {
      // ***bg1 Foxing Light
      data.meta.attributes.push({
        trait_type: 'SITE of WEBS',
        value: `Substrate: Foxing Light`,
      })

      bModes = [p.BLEND, p.BURN, p.DIFFERENCE]
      line1_hus = [
        [0, 359],
        [0, 15],
        [200, 359],
        [251, 342],
      ]
      line1_brts = [
        [15, 25],
        [37, 50],
        [70, 95],
      ]
      line1_sats = [[95, 100]]
      line1_alphs = [[2, 4]] //1 to 100
      line2_hus = [[0, 359]]
      line2_brts = [[75, 90]]
      line2_sats = [[100, 100]]
      line2_alphs = [[1, 3]]

      bgFunc = () => {
        bg_hu = [0, 0]
        bg_brt = p.random([
          [75, 100],
          [55, 97],
          [80, 95],
        ])
        bg_sat = p.random(0, 10)
        let size = 2.5

        for (let i = 0; i < width; i++) {
          // noprotect
          for (let j = 0; j < height; j++) {
            let n = p.noise(i / 40, j / 15, distance(150, j, 150, 0) / 20)
            let li = p.map(n ** 0.65 + 0.1, 0, 1, bg_brt[0], bg_brt[1]) //brightness
            let hu = p.map(n, 0, 1, bg_hu[0], bg_hu[1])
            p.fill(hu, bg_sat, li, 10)
            p.rect(i * size, j * size, size, size)
          }
        }
      }
    } else if (selected_background === 'bg1_dark') {
      //*** bg1 Foxing Dark
      data.meta.attributes.push({
        trait_type: 'SITE of WEBS',
        value: `Substrate: Foxing Dark`,
      })
      bModes = [p.BLEND, p.SOFT_LIGHT, p.LIGHTEST]
      line1_hus = [
        [0, 359],
        [0, 10],
        [200, 360],
        [231, 240],
        [251, 342],
        [118, 161],
      ]
      line1_brts = [[80, 100]]
      line1_sats = [[95, 100]]
      line1_alphs = [[2, 5]]

      line2_hus = [] //[[0,0],[200,360],[220,254],[0,359],[360,360]];
      line2_brts = [] //[[65,90],[75,90],[0,40],[0,30]];
      line2_sats = [] //[[15,20]];
      line2_alphs = []
      bgFunc = () => {
        bg_hu = [0, 0]
        bg_brt = p.random([
          [2, 8],
          [10, 15],
        ])
        bg_sat = 0
        let size = 2.5

        for (let i = 0; i < width; i++) {
          // noprotect
          for (let j = 0; j < height; j++) {
            let n = p.noise(i / 40, j / 15, distance(150, j, 150, 0) / 20)
            let li = p.map(n ** 0.65 + 0.1, 0, 1, bg_brt[0], bg_brt[1]) //brightness
            let hu = p.map(n, 0, 1, bg_hu[0], bg_hu[1])
            p.fill(hu, bg_sat, li, 10)
            p.rect(i * size, j * size, size, size)
          }
        }
      }
    } else if (selected_background === 'bg2_light') {
      //*** bg2 Foxing Light
      data.meta.attributes.push({
        trait_type: 'SITE of WEBS',
        value: `Substrate: Foxing Light`,
      })
      bModes = [p.BLEND, p.HARD_LIGHT]
      line1_hus = [
        [0, 359],
        [0, 10],
        [238, 0],
        [90, 235],
        [1, 359],
        [1, 15],
        [285, 359],
      ]
      line1_brts = [
        [40, 50],
        [95, 100],
      ]
      line1_sats = [[80, 100]]
      line1_alphs = [[2, 5]]

      line2_hus = [] //[[210,210]];
      line2_brts = [] //[[100,100]];
      line2_sats = [] //[[100,100]];
      line2_alphs = []
      bgFunc = () => {
        bg_hu = p.random([
          [24, 141],
          [19, 39],
          [90, 136],
          [0, 45],
        ])
        bg_brt = [85, 100]
        bg_sats = [[90, 90]]
        bg_sat_range = bg_sats[p.random(0, bg_sats.length - 1)]
        bg_sat = p.random(bg_sat_range[0], bg_sat_range[1])

        let size = 3

        for (let i = 0; i < width; i++) {
          // noprotect
          for (let j = 0; j < height; j++) {
            let n = p.noise(i / 40, j / 15, distance(150, j, 150, 0) / 20)
            let li = p.map(n ** 0.65 + 0.1, 0, 1, bg_brt[0], bg_brt[1]) //brightness
            let hu = p.map(n, 0, 1, bg_hu[0], bg_hu[1])
            p.fill(hu, bg_sat, li, 10)
            p.rect(i * size, j * size, size, size)
          }
        }
      }
    } else if (selected_background === 'bg2_dark') {
      //***bg2 Foxing Dark
      data.meta.attributes.push({
        trait_type: 'SITE of WEBS',
        value: `Substrate: Foxing Dark`,
      })
      bModes = [p.BLEND, p.HARD_LIGHT, p.DODGE]
      line1_hus = [
        [0, 360],
        [103, 162],
        [300, 0],
        [1, 359],
      ]
      line1_brts = [[90, 98]]
      line1_sats = [
        [14, 55],
        [56, 100],
      ]
      line1_alphs = [[2, 4]]

      line2_hus = [] //[0,0],[200,360],[220,254],[0,359],[360,360]];
      line2_brts = [] //[[65,90],[75,90],[0,40],[0,30]];
      line2_sats = [] //[[100,100]];
      line2_alphs = []
      bgFunc = () => {
        bg_hu = p.random([
          [265, 277],
          [287, 359],
          [0, 10],
          [201, 248],
          [190, 265],
        ])
        bg_brt = [8, 15]
        bg_sat = 100
        let size = 3

        for (let i = 0; i < width; i++) {
          // noprotect
          for (let j = 0; j < height; j++) {
            let n = p.noise(i / 40, j / 15, distance(150, j, 150, 0) / 20)
            let li = p.map(n ** 0.65 + 0.1, 0, 1, bg_brt[0], bg_brt[1]) //brightness
            let hu = p.map(n, 0, 1, bg_hu[0], bg_hu[1])
            p.fill(hu, bg_sat, li, 10)
            p.rect(i * size, j * size, size, size)
          }
        }
      }
    } else if (selected_background === 'bg3_light') {
      //***bg3 Typhoon AM
      data.meta.attributes.push({
        trait_type: 'SITE of WEBS',
        value: `Substrate: Typhoon AM`,
      })
      bModes = [p.BLEND, p.HARD_LIGHT]
      line1_hus = [
        [282, 93],
        [89, 180],
        [298, 12],
        [240, 270],
      ]
      line1_brts = [[100, 100]]
      line1_sats = [[100, 100]]
      line1_alphs = [[2, 5]]

      line2_hus = [
        [0, 0],
        [325, 9],
        [220, 235],
        [0, 359],
      ]
      line2_brts = [[100, 100]]
      line2_sats = [[100, 100]]
      line2_alphs = [[1, 2]]
      bgFunc = () => {
        bg_hu = p.random([
          [0, 88],
          [295, 21],
          [57, 100],
          [332, 38],
        ])
        bg_brt = [85, 90]
        bg_sat = p.ranodm(30, 55)
        let size = 1

        for (let i = 0; i < width; i++) {
          // noprotect
          for (let j = 0; j < height; j++) {
            let n = p.noise(
              distance(i, j, rand_x1, rand_y1) / 70,
              distance(i, j, rand_x2, rand_y2) / 80,
              distance(i, j, rand_x3, rand_y3) / 80
            )
            let li = p.map(n, 0, 1, bg_brt[0], bg_brt[1])
            let hu = p.map(n, 0, 1, bg_hu[0], bg_hu[1])
            p.fill(hu, bg_sat, li, 10)
            p.rect(i * size, j * size, size, size)
          }
        }
      }
    } else if (selected_background === 'bg3_dark') {
      //***bg3 Typhoon PM
      data.meta.attributes.push({
        trait_type: 'SITE of WEBS',
        value: `Substrate: Typhoon PM`,
      })
      bModes = [p.BLEND, p.BURN, p.DIFFERENCE]
      line1_hus = [
        [0, 359],
        [89, 180],
        [298, 12],
        [240, 270],
      ]
      line1_brts = [
        [10, 20],
        [90, 100],
      ]
      line1_sats = [
        [90, 100],
        [10, 20],
      ]
      line1_alphs = [[4, 5]]

      line2_hus = [
        [0, 0],
        [200, 360],
        [325, 9],
        [220, 254],
      ]
      line2_brts = [
        [65, 90],
        [75, 90],
      ]
      line2_sats = [[100, 100]]
      line2_alphs = [[1, 3]]
      bgFunc = () => {
        bg_hu = p.random([
          [295, 359],
          [210, 280],
          [19, 36],
          [170, 190],
        ])
        bg_brt = [5, 25]
        bg_sat = p.random(90, 100)
        let size = 3

        for (let i = 0; i < width; i++) {
          // noprotect
          for (let j = 0; j < height; j++) {
            //let n = noise(i*sin(i/20)/50+j*sin(j/20)/50+i/40+j/40,i/0+j/20);
            let n = p.noise(
              distance(i, j, rand_x1, rand_y1) / 70,
              distance(i, j, rand_x2, rand_y2) / 80,
              distance(i, j, rand_x3, rand_y3) / 80
            )
            //let li = map(n, 0, 1, 20, 100);
            //let hu = map(n, 0, 1,210,240 );
            //fill(hu, 100, li,10);
            let li = p.map(n, 0, 1, bg_brt[0], bg_brt[1])
            let hu = p.map(n, 0, 1, bg_hu[0], bg_hu[1])
            p.fill(hu, bg_sat, li, 10)
            p.rect(i * size, j * size, size, size)
          }
        }
      }
    } else if (selected_background === 'bg4_light') {
      //***bg4 Mist
      data.meta.attributes.push({
        trait_type: 'SITE of WEBS',
        value: `Substrate: Mist`,
      })
      bModes = [p.BLEND, p.BURN]
      line1_hus = [
        [0, 359],
        [0, 30],
        [189, 292],
      ]
      line1_brts = [
        [100, 100],
        [40, 100],
      ] //[20,30]];
      line1_sats = [[80, 100]]
      line1_alphs = [[4, 5]]

      line2_hus = [[0, 359]]
      line2_brts = [[75, 90]] //
      line2_sats = [[100, 100]]
      line2_alphs = [[1, 3]]
      bgFunc = () => {
        bg_hu = p.random([
          [189, 359],
          [0, 10],
          [29, 35],
          [190, 259],
        ])
        bg_brt = p.random([
          [10, 27],
          [30, 50],
          [60, 90],
        ])
        bg_sat_range = p.random([
          [10, 22],
          [26, 55],
          [60, 90],
        ])
        bg_sat = p.random(bg_sat_range[0], bg_sat_range[1])
        let size = 2

        for (let i = 0; i < width; i++) {
          // noprotect
          for (let j = 0; j < height; j++) {
            let n = p.noise(i / 90, j / 90)
            let li = p.map(n ** 0.5 + 0.4, 0, 1, bg_brt[0], bg_brt[1])
            let hu = p.map(n, 0, 1, bg_hu[0], bg_hu[1])
            p.fill(hu, bg_sat, li, 10)
            p.rect(i * size, j * size, size, size)
          }
        }
      }
    } else if (selected_background === 'bg4_dark') {
      //***bg4 Fog
      data.meta.attributes.push({
        trait_type: 'SITE of WEBS',
        value: `Substrate: Fog`,
      })
      bModes = [p.LIGHTEST, p.HARD_LIGHT]
      line1_hus = [
        [0, 359],
        [359, 0],
      ]
      line1_brts = [[90, 100]]
      line1_sats = [[70, 95]]
      line1_alphs = [[2, 5]]

      line2_hus = []
      line2_brts = [[75, 90]] //
      line2_sats = [[20, 30]]
      line2_alphs = [[100, 100]]
      bgFunc = () => {
        bg_hu = p.random([
          [295, 259],
          [220, 280],
          [160, 185],
          [250, 350],
        ])
        bg_brt = [20, 30]
        bg_sat_range = p.random([
          [20, 30],
          [50, 60],
        ])
        bg_sat = p.random(bg_sat_range[0], bg_sat_range[1])
        let size = 2

        for (let i = 0; i < width; i++) {
          // noprotect
          for (let j = 0; j < height; j++) {
            let n = p.noise(i / 90, j / 90)
            let li = p.map(n ** 0.5 + 0.4, 0, 1, bg_brt[0], bg_brt[1])
            let hu = p.map(n, 0, 1, bg_hu[0], bg_hu[1])
            p.fill(hu, bg_sat, li, 10)
            p.rect(i * size, j * size, size, size)
          }
        }
      }
    } else if (selected_background === 'bg5_dark') {
      //***bg5 Gyre
      data.meta.attributes.push({
        trait_type: 'SITE of WEBS',
        value: `Substrate: Gyre`,
      })
      bModes = [p.DODGE]
      line1_hus = [
        [0, 359],
        [120, 235],
      ]
      line1_brts = [[100, 100]]
      line1_sats = [[65, 100]]
      line1_alphs = [[2, 5]]

      line2_hus = [
        [0, 0],
        [200, 360],
        [220, 254],
        [0, 359],
      ]
      line2_brts = [[95, 100]]
      line2_sats = [[100, 100]]
      line2_alphs = [[1, 2]]
      bgFunc = () => {
        bg_hu = p.random([
          [0, 10],
          [181, 359],
          [167, 185],
          [0, 30],
          [226, 266],
        ])
        bg_brt = [8, 25]
        bg_sat = p.random(40, 68)
        let size = 2

        for (let i = 0; i < width; i++) {
          // noprotect
          for (let j = 0; j < height; j++) {
            let n = p.noise(
              i / 40,
              j / 40,
              ((i - 100) ** 2 + (j - 150) ** 2) ** 0.5 / 32
            )
            let li = p.map(n, 0, 1, bg_brt[0], bg_brt[1])
            let hu = p.map(n, 0, 1, bg_hu[0], bg_hu[1])
            p.fill(hu, bg_sat, li, 10)
            p.rect(i * size, j * size, size, size)
          }
        }
      }
    } else if (selected_background === 'bg6_light') {
      //*** Clouds AM
      data.meta.attributes.push({
        trait_type: 'SITE of WEBS',
        value: `Substrate: Clouds AM`,
      })
      bModes = [p.DIFFERENCE, p.EXCLUSION, p.BURN]
      line1_hus = [
        [60, 210],
        [290, 57],
        [0, 359],
      ]
      line1_brts = [[80, 95]]
      line1_sats = [[79, 100]]
      line1_alphs = [[2, 4]]

      line2_hus = [
        [200, 360],
        [220, 254],
        [0, 359],
        [360, 360],
      ]
      line2_brts = [
        [65, 90],
        [75, 90],
        [0, 40],
        [0, 30],
      ]
      line2_sats = [[100, 100]]
      line2_alphs = [[1, 3]]
      bgFunc = () => {
        bg_hu = p.random([
          [0, 14],
          [168, 181],
          [220, 251],
          [288, 309],
        ])
        bg_brt = [89, 95]
        bg_sat = p.random(10, 20)

        let size = 2

        for (let i = 0; i < width; i++) {
          // noprotect
          for (let j = 0; j < height; j++) {
            let n = p.noise((i + 150) ** 0.5, (j + 100) ** 0.5)
            let li = p.map(
              n ** (20000 ** (n - 0.5)),
              0,
              1,
              bg_brt[0],
              bg_brt[1]
            ) //brightness
            let hu = p.map(n, 0, 1, bg_hu[0], bg_hu[1])
            p.fill(hu, bg_sat, li, 10)
            p.rect(i * size, j * size, size, size)
          }
        }
      }
    } else if (selected_background === 'bg6_dark') {
      //***bg6 Clouds PM
      data.meta.attributes.push({
        trait_type: 'SITE of WEBS',
        value: `Substrate: Clouds PM`,
      })
      bModes = [p.BLEND, p.SOFT_LIGHT, p.LIGHTEST]
      line1_hus = [[0, 359]]
      line1_brts = [[90, 100]]
      line1_sats = [
        [10, 30],
        [80, 100],
      ]
      line1_alphs = [[2, 5]]

      line2_hus = [
        [0, 0],
        [200, 360],
        [220, 254],
        [0, 359],
        [360, 360],
      ]
      line2_brts = [
        [65, 90],
        [75, 90],
      ]
      line2_sats = [[100, 100]]
      line2_alphs = [[1, 2]]
      bgFunc = () => {
        bg_hu = p.random([
          [0, 14],
          [13, 24],
          [168, 181],
          [220, 251],
          [288, 309],
        ])
        bg_brt = [10, 17]
        bg_sat_range = p.random([
          [10, 50],
          [50, 90],
        ])
        bg_sat = p.random(bg_sat_range[0], bg_sat_range[1])
        let size = 2

        for (let i = 0; i < width; i++) {
          // noprotect
          for (let j = 0; j < height; j++) {
            let n = p.noise((i + 150) ** 0.5, (j + 100) ** 0.5)
            let li = p.map(
              n ** (20000 ** (n - 0.5)),
              0,
              1,
              bg_brt[0],
              bg_brt[1]
            ) //brightness
            let hu = p.map(n, 0, 1, bg_hu[0], bg_hu[1])
            p.fill(hu, bg_sat, li, 10)
            p.rect(i * size, j * size, size, size)
          }
        }
      }
    }

    bMode = p.random(bModes)
    // console.log('bMode:', bMode)

    let selected_line1_hu = p.random(line1_hus)
    let hu1 = p.random(selected_line1_hu[0], selected_line1_hu[1])

    let selected_line1_brt = p.random(line1_brts)
    let brt1 = p.random(selected_line1_brt[0], selected_line1_brt[1])

    let selected_line1_sat = p.random(line1_sats)
    let sat1 = p.random(selected_line1_sat[0], selected_line1_sat[1])

    let selected_line1_alph = p.random(line1_alphs)
    let alph1 = p.random(selected_line1_alph[0], selected_line1_alph[1])

    let start_color1 = selected_line1_hu[0] //p.random(1,360);
    let end_color1 = selected_line1_hu[1] //p.random(1,360);

    // console.log('alph1', alph1)
    let start_color2: number = 0,
      end_color2: number = 0,
      hu2: number = 0,
      brt2: number = 0,
      sat2: number = 0,
      alph2: number = 0

    if (line2_hus.length != 0) {
      data.meta.attributes.push({
        trait_type: 'SITE of WEBS',
        value: `Starting Color: Double Hue Seed`,
      })
      let selected_line2_hu = p.random(line2_hus)
      hu2 = p.random(selected_line2_hu[0], selected_line2_hu[1])

      let selected_line2_brt = p.random(line2_brts)
      brt2 = p.random(selected_line2_brt[0], selected_line2_brt[1])

      let selected_line2_sat = p.random(line2_sats)
      sat2 = p.random(selected_line2_sat[0], selected_line2_sat[1])

      let selected_line2_alph = p.random(line2_alphs)
      alph2 = p.random(selected_line2_alph[0], selected_line2_alph[1])

      start_color2 = selected_line2_hu[0] //p.random(1,360);
      end_color2 = selected_line2_hu[1] //p.random(1,360);
      // console.log('alph2', alph2)
    } else {
      data.meta.attributes.push({
        trait_type: 'SITE of WEBS',
        value: `Starting Color: Single Hue Seed`,
      })
    }

    // console.log('hu1=', hu1)
    // console.log('brt1=', brt1)
    // console.log('sat1=', sat1)
    // console.log('hu2=', hu2)
    // console.log('brt2=', brt2)
    // console.log('sat2=', sat2)

    let sat = sat1
    let brt = brt1
    let hu = hu1
    let alph = alph1

    let startingBoxesTemplate = [
      //***starting box template/particle system restrictions
      [false, 25, 25, 3],
      [false, 25, 400, 5],
      [true, 80],
      [false, 25, 245, 5],
      [false, 265, 25, 3],
      [true, 2],
      [false, 25, 205, 5],
      [false, 25, 405, 4],
      [false, 60, 25, 5],
      [false, 25, 205, 3],
      [false, 25, 405, 5],
      [true, 2],
      [true, 2],
      [false, 25, 25, 5],
      [false, 205, 205, 4],
      [false, 205, 405, 5],
      [true, 100],
      [false, 25, 25, 5],
      [false, 37, 5, 4],
      [false, 25, 405, 5],
    ]

    function shuffleArray(arr: any[]) {
      let array = [...arr]
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(p.random() * (i + 1))
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
      let select_arr_num = p.random() * arr.length
      // console.log('select_arr_num_original:', select_arr_num)
      return array.slice(0, select_arr_num < 3 ? 3 : select_arr_num)
    }
    //*** starting boxes template
    let startingBoxes = shuffleArray(startingBoxesTemplate)

    // console.log('starting boxes:', startingBoxes)

    let startingPoints = startingBoxes.map(([fullScreen, w, h, speed]) => {
      if (fullScreen) {
        return [0, 400, 0, 600]
      } else return [p.random(0, 400), w, p.random(0, 600), h, speed]
    })

    let numbPart = p.random(500, 9000) // number of particles
    let random_select_colorInc = p.random([
      [1, 2, 'slow'],
      [3, 4, 'normal'],
      [5, 6, 'fast'],
    ])
    let colorInc = p.random(
      random_select_colorInc[0],
      random_select_colorInc[1]
    ) // Color change speed
    // console.log('Color change speed:', random_select_colorInc[2])

    // become random choose let alph = 5; // alpha max 100
    let partStroke = p.random(0.5, 1) // line width
    let angMult = p.random(15, 100) // 0.1 = straighter lines; 25+ = sharp curves
    let angTurn = p.random(20, 100) // adjust angle for straight lines (after adjusting angMult)
    let selected_zOffInc = p.random([
      [0.003, 5, 'slow'],
      [11, 25, 'normal'],
      [26, 40, 'fast'],
    ])
    let zOffInc = p.random(selected_zOffInc[0], selected_zOffInc[1]) // speed of vector changes
    // console.log('selected_zOffInc:', selected_zOffInc[2])

    class Particle {
      pos
      vel
      acc
      maxspeed
      prevPos

      constructor(
        maxspeed: number,
        widthMin = 5,
        widthMax = 390,
        heightMin = 5,
        heightMax = 595
      ) {
        //this.pos = createVector(random(width), random(height));
        this.pos = p.createVector(
          p.random(widthMin, widthMax),
          p.random(heightMin, heightMax)
        )
        this.vel = p.createVector(0, 0)
        this.acc = p.createVector(0, 0)
        this.maxspeed = maxspeed
        this.prevPos = this.pos.copy()
      }

      update() {
        this.vel.add(this.acc)
        //this.vel.limit(this.maxspeed);
        //this.pos.add(this.vel);
        this.vel.limit(this.maxspeed)
        this.pos.add(this.vel)
        this.acc.mult(0)
      }

      follow(vectors: any[]) {
        var x = Math.floor(this.pos.x / scl)
        var y = Math.floor(this.pos.y / scl)
        var index = x + y * cols
        var force = vectors[index]
        this.applyForce(force)
      }

      applyForce(force: any) {
        this.acc.add(force)
      }
      //NORMAL,BURN,DIFFERENCE,MULTIPLY,
      //bg_light & bg_dark:HARD_LIGHT,BURN
      //bg_dark: DODGE, DARKEST, HARD_LIGHT, SOFT_LIGHT

      show() {
        p.blendMode(bMode)
        p.stroke(hu, sat, brt, alph)
        p.strokeWeight(partStroke)
        p.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y)
        this.updatePrev()
      }

      updatePrev() {
        this.prevPos.x = this.pos.x
        this.prevPos.y = this.pos.y
      }

      edges() {
        if (this.pos.x > 0.95 * width) {
          this.pos.x = p.random(0.04, 0.96) * width
          this.updatePrev()
        }
        if (this.pos.x < 0.05 * width) {
          this.pos.x = p.random(0.04, 0.96) * width
          this.updatePrev()
        }
        if (this.pos.y > 0.95 * height) {
          this.pos.y = p.random(0.04, 0.96) * height
          this.updatePrev()
        }
        if (this.pos.y < 0.05 * height) {
          this.pos.y = p.random(0.04, 0.96) * height
          this.updatePrev()
        }
      }
    }

    //let zOffInc = 20;
    let inc = 0.1
    let scl = 10
    let cols: number, rows: number
    let zoff = 0
    let particles1: Particle[] = []
    let particles2: Particle[] = []
    let flowfield: any
    let check_hu1 = 1
    let check_hu2 = 1

    // console.log('numbPart(particle number from 1000 to 10000):', numbPart)
    // console.log('colorInc(Color change speedfrom 1 to 10):', colorInc)
    // console.log('partStroke(line thickness from 0.5 to 1):', partStroke)
    // console.log('angMult(from 20 to 100):', angMult)
    // console.log('angTurn(from 20 to 100):', angTurn)
    // console.log('zOffInc(speed of vector changes from .001 to 40:)', zOffInc)

    function distance(i: number, j: number, x: number, y: number) {
      return ((x - i) ** 2 + (y - j) ** 2) ** 0.5
    }

    let right_edge: number
    let bg: any

    p.setup = () => {
      data.canvas = p.createCanvas(width, height)
      p.colorMode(p.HSL)
      p.noStroke()
      bgFunc()

      cols = Math.floor(width / scl)
      rows = Math.floor(height / scl)

      flowfield = new Array(cols * rows)

      for (let i = 0; i < numbPart; i++) {
        // particle starting points are dividing in 3 below. Particle parameters are speed,start point,end points
        for (let j = 0; j < startingPoints.length; j++) {
          if (i % startingPoints.length == j) {
            particles1[i] = new Particle(
              startingPoints[j][4],
              startingPoints[j][0],
              startingPoints[j][0] + startingPoints[j][1],
              startingPoints[j][2],
              startingPoints[j][2] + startingPoints[j][3]
            )
            if (line2_hus.length != 0) {
              particles2[i] = new Particle(
                startingPoints[j][4],
                startingPoints[j][0],
                startingPoints[j][0] + startingPoints[j][1],
                startingPoints[j][2],
                startingPoints[j][2] + startingPoints[j][3]
              )
            }
          }
        }
      }
      //background(10);

      let size = 2

      p.colorMode(p.HSB, 359, 100, 100, 100)
      right_edge = Math.floor(0.96 * width)
      bg = p.get(right_edge, 0, width - right_edge, height)

      let yoff = 0

      for (let y = 0; y < rows; y++) {
        let xoff = 0
        for (let x = 0; x < cols; x++) {
          let index = x + y * cols
          let angle = p.noise(xoff, yoff, zoff) * angMult + angTurn
          let v = p.Vector.fromAngle(angle)
          v.setMag(1)
          flowfield[index] = v
          xoff += inc
        }

        yoff += inc
        zoff += zOffInc
      }
    }

    p.draw = () => {
      for (let i = 0; i < particles1.length; i++) {
        sat = sat1
        brt = brt1
        hu = hu1
        alph = alph1

        particles1[i].follow(flowfield)
        particles1[i].update()
        particles1[i].edges()
        particles1[i].show()

        if (line2_hus.length != 0) {
          sat = sat2
          brt = brt2
          hu = hu2
          alph = alph2

          particles2[i].follow(flowfield)
          particles2[i].update()
          particles2[i].edges()
          particles2[i].show()
        }
      }
      p.blendMode(p.BLEND)
      p.image(bg, right_edge, 0)

      if (hu1 > end_color1) {
        check_hu1 = -1
        //end_color1 = p.random(selected_line1_hu[0],selected_line1_hu[1]);
      } else if (hu1 < start_color1) {
        check_hu1 = 1
        //end_color1 = p.random(selected_line1_hu[0],selected_line1_hu[1]);
      }

      if (check_hu1 == 1) {
        hu1 += colorInc
      } else if (check_hu1 == -1) {
        hu1 -= colorInc
      }

      if (line2_hus.length != 0) {
        if (hu2 > end_color2) {
          check_hu2 = -1
          //end_color1 = p.random(selected_line1_hu[0],selected_line1_hu[1]);
        } else if (hu2 < start_color2) {
          check_hu2 = 1
          //end_color1 = p.random(selected_line1_hu[0],selected_line1_hu[1]);
        }

        if (check_hu2 == 1) {
          hu2 += colorInc
        } else if (check_hu2 == -1) {
          hu2 -= colorInc
        }
      }

      if (p.frameCount === pause_frame) {
        // console.log('end reached')
        p.noLoop()
      }
    }
  }

  return {
    data,
    sketch,
  }
}
