import { ViewFunc } from '.'

export const gensengView: ViewFunc = (
  projectId: number,
  projectTokenId: number,
  tokenId: number
) => {
  const data: any = {
    repeat: 0,
    quality: 10,
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
      artist: 'Brian Waxham',
    }
    if (projectTokenId < 10) {
      data.meta.name = `Genseng 00${projectTokenId}`
    } else if (projectTokenId < 100) {
      data.meta.name = `Genseng 0${projectTokenId}`
    } else {
      data.meta.name = `Genseng ${projectTokenId}`
    }
    data.meta.collection = 'Genseng: An Infinite Regress'
    data.meta.contract = process.env.CONTRACT
    data.meta.script = 'https://github.com/DAOfi/node-worker/blob/main/src/views/genseng.ts'
    data.meta.description =
      'A blend of generative and ginseng, Brian’s NFT, “Genseng: An Infinite Regress” is a compositional system in which colorful vortexes have enveloped a digital canvas. Randomization of numerical sequences determines color combinations from a set of color palettes curated both intuitively and systematically according to emotional resonance and memetic significance.'
    data.meta.attributes = []
    data.meta.attributes.push({
      trait_type: 'Genseng: An Infinite Regress',
      value: 'All Genseng',
    })

    const paletteNames = [
      'Affectionate',
      'Ambitious',
      'Alert',
      'Awake',
      'Bright',
      'Blazing',
      'Blissful',
      'Balanced',
      'Blooming',
      'Blushing',
      'Bold',
      'Calm',
      'Tricky',
      'Cheerful',
      'Chilled',
      'Cute',
      'Cosmic',
      'Curious',
      'Compassionate',
      'Courageous',
      'Creative',
      'Decisive',
      'Deep',
      'Driven',
      'Diligent',
      'Determined',
      'Dynamic',
      'Discreet',
      'Enthusiastic',
      'Enlightened',
      'Empathic',
      'Energetic',
      'Exuberant',
      'Enchanting',
      'Euphoric',
      'Ethereal',
      'Exotic',
      'Exuberant',
      'Fearless',
      'Fantastic',
      'Focused',
      'Friendly',
      'Funny',
      'Fluffy',
      'Fresh',
      'Genius',
      'Generous',
      'Gentle',
      'Groovy',
      'Happy',
      'Heartwarming',
      'Honest',
      'Humble',
      'Illuminating',
      'Imaginative',
      'Inspiring',
      'Idealistic',
      'Innovative',
      'Joyous',
      'Loyal',
      'Loving',
      'Lovely',
    ]
    const palettes: any = []
    const onions: any = []
    const blobs: any = []
    const voids: any = []
    const oblobs: any = []
    const width = 2400
    const height = 2400
    let paletteIdx: number

    class Onion {
      x: number
      y: number
      dim: number

      constructor(x: number, y: number, d: number) {
        this.x = x
        this.y = y
        this.dim = d
      }

      display() {
        p.push()
        p.translate(this.x, this.y)
        p.noStroke()
        p.push()
        let cc = palettes[paletteIdx][p.int(p.random(10))]

        for (let i = 0; i < 6; i++) {
          p.scale(0.98)
          let newc = p.lerpColor(
            palettes[paletteIdx][p.int(p.random(10))],
            cc,
            i / 6
          )
          newc.setAlpha(130)
          p.fill(newc)
          p.beginShape()

          for (let e = 0; e < 201; e++) {
            let x = p.cos(0.1 * e) //x is calculated by increasing the cos value by the angle step for each iteration
            let y = p.sin(0.1 * e) //y is calculated by increasing the sin value by the angle step for each iteration
            let v = p.createVector(x, y) //create a vector with the x and y components
            v.normalize() //then we normalize the vector (magnitude of 1)
            let n = p.map(
              p.noise(v.x * 0.5 + 0.78, v.y * 0.5 + 0.78),
              0,
              1,
              this.dim,
              this.dim + 50
            ) //with the noise function it's possible to create random values based on sone parameters that you can change with sliders
            v.mult(n) //then multiply that random value by the vector
            p.vertex(v.x, v.y)
            p.ellipse(v.x, v.y, p.random(40, 60), p.random(40, 60))
          }

          p.endShape()
        }

        p.pop()
        p.push()
        cc = palettes[paletteIdx][p.int(p.random(10))]

        for (let i = 0; i < 6; i++) {
          p.scale(0.98)
          let newc = p.lerpColor(
            palettes[paletteIdx][p.int(p.random(10))],
            cc,
            i / 6
          )
          newc.setAlpha(130)
          p.fill(newc)
          p.beginShape()

          for (let e = 0; e < 201; e++) {
            let x = p.cos(0.1 * e) //x is calculated by increasing the cos value by the angle step for each iteration
            let y = p.sin(0.1 * e) //y is calculated by increasing the sin value by the angle step for each iteration
            var v = p.createVector(x, y) //create a vector with the x and y components
            v.normalize() //then we normalize the vector (magnitude of 1)
            let n = p.map(
              p.noise(v.x * 0.5 + 0.78, v.y * 0.5 + 0.78),
              0,
              1,
              this.dim - 50,
              this.dim
            ) //with the noise function it's possible to create random values based on sone parameters that you can change with sliders
            v.mult(n) //then multiply that random value by the vector
            p.vertex(v.x, v.y)
            p.ellipse(v.x, v.y, p.random(40, 60), p.random(40, 60))
          }

          p.endShape()
        }

        p.pop()
        p.push()
        cc = palettes[paletteIdx][p.int(p.random(10))]

        for (let i = 0; i < 6; i++) {
          p.scale(0.98)
          let newc = p.lerpColor(
            palettes[paletteIdx][p.int(p.random(10))],
            cc,
            i / 6
          )
          newc.setAlpha(130)
          p.fill(newc)
          p.beginShape()

          for (let e = 0; e < 201; e++) {
            let x = p.cos(0.1 * e) //x is calculated by increasing the cos value by the angle step for each iteration
            let y = p.sin(0.1 * e) //y is calculated by increasing the sin value by the angle step for each iteration
            var v = p.createVector(x, y) //create a vector with the x and y components
            v.normalize() //then we normalize the vector (magnitude of 1)
            let n = p.map(
              p.noise(v.x * 0.5 + 0.78, v.y * 0.5 + 0.78),
              0,
              1,
              this.dim - 100,
              this.dim - 50
            ) //with the noise function it's possible to create random values based on sone parameters that you can change with sliders
            v.mult(n) //then multiply that random value by the vector
            //p.fill(palette[int(p.random(5))])
            p.vertex(v.x, v.y)
            p.ellipse(v.x, v.y, p.random(40, 60), p.random(40, 60))
          }

          p.endShape()
        }

        p.pop()
        p.push()
        cc = palettes[paletteIdx][p.int(p.random(10))]

        for (let i = 0; i < 6; i++) {
          p.scale(0.98)
          let newc = p.lerpColor(
            palettes[paletteIdx][p.int(p.random(10))],
            cc,
            i / 6
          )
          newc.setAlpha(130)
          p.fill(newc)
          p.beginShape()

          for (let e = 0; e < 201; e++) {
            let x = p.cos(0.1 * e) //x is calculated by increasing the cos value by the angle step for each iteration
            let y = p.sin(0.1 * e) //y is calculated by increasing the sin value by the angle step for each iteration
            var v = p.createVector(x, y) //create a vector with the x and y components
            v.normalize() //then we normalize the vector (magnitude of 1)
            let n = p.map(
              p.noise(v.x * 0.5 + 0.78, p.y * 0.5 + 0.78),
              0,
              1,
              this.dim - 150,
              this.dim - 100
            ) //with the noise function it's possible to create random values based on sone parameters that you can change with sliders
            v.mult(n) //then multiply that random value by the vector
            p.vertex(v.x, v.y)
            p.ellipse(v.x, v.y, p.random(40, 60), p.random(40, 60))
          }

          p.endShape()
        }

        p.pop()
        p.push()
        cc = palettes[paletteIdx][p.int(p.random(10))]

        for (let i = 0; i < 6; i++) {
          p.scale(0.98)
          let newc = p.lerpColor(
            palettes[paletteIdx][p.int(p.random(10))],
            cc,
            i / 6
          )
          newc.setAlpha(130)
          p.fill(newc)
          p.beginShape()

          for (let e = 0; e < 201; e++) {
            let x = p.cos(0.1 * e) //x is calculated by increasing the cos value by the angle step for each iteration
            let y = p.sin(0.1 * e) //y is calculated by increasing the sin value by the angle step for each iteration
            var v = p.createVector(x, y) //create a vector with the x and y components
            v.normalize() //then we normalize the vector (magnitude of 1)
            let n = p.map(
              p.noise(v.x * 0.5 + 0.78, v.y * 0.5 + 0.78),
              0,
              1,
              this.dim - 200,
              this.dim - 150
            ) //with the noise function it's possible to create random values based on sone parameters that you can change with sliders
            v.mult(n) //then multiply that random value by the vector
            p.vertex(v.x, v.y)
            p.ellipse(v.x, v.y, p.random(40, 60), p.random(40, 60))
          }

          p.endShape()
        }

        p.pop()
        p.pop()
      }
    }

    class Blb {
      x: number
      y: number
      dim: number
      r: number

      constructor(x: number, y: number, d: number, r: number) {
        this.x = x
        this.y = y
        this.dim = d
        this.r = r
      }

      display() {
        p.push()
        p.translate(this.x, this.y)
        p.rotate(p.random(p.PI / 15))
        p.noStroke()
        p.push()
        let cc = palettes[paletteIdx][p.int(p.random(10))]
        let sc = palettes[paletteIdx][p.int(p.random(10))]
        for (let i = 0; i < 6; i++) {
          p.scale(0.98)
          let newc = p.lerpColor(sc, cc, i / 6)
          newc.setAlpha(130)
          p.fill(newc)
          p.beginShape()
          for (var e = 0; e < 2 * p.PI; e += 0.1) {
            let xoff = p.cos(e) + this.r //x is calculated by increasing the cos value by the angle step for each iteration
            let yoff = p.sin(e) + this.r //y is calculated by increasing the sin value by the angle step for each iteration
            let n = p.map(
              p.noise(xoff * this.r * 0.05, yoff * this.r * 0.05),
              0,
              1,
              this.dim - 26,
              this.dim + 200
            ) //then multiply that random value by the vector
            let x = n * p.cos(e)
            let y = n * p.sin(e)
            p.vertex(x, y)
            p.ellipse(x, y, p.random(40, 60), p.random(40, 60))
          }
          p.endShape()
        }
        p.pop()

        p.push()
        cc = palettes[paletteIdx][p.int(p.random(10))]
        sc = palettes[paletteIdx][p.int(p.random(10))]
        for (let i = 0; i < 6; i++) {
          p.scale(0.98)
          let newc = p.lerpColor(sc, cc, i / 6)
          newc.setAlpha(130)
          p.fill(newc)
          p.beginShape()
          for (var e = 0; e < 2 * p.PI; e += 0.1) {
            let xoff = p.cos(e) + this.r //x is calculated by increasing the cos value by the angle step for each iteration
            let yoff = p.sin(e) + this.r //y is calculated by increasing the sin value by the angle step for each iteration
            let n = p.map(
              p.noise(xoff * this.r * 0.05, yoff * this.r * 0.05),
              0,
              1,
              this.dim - 26 - 50,
              this.dim + 200 - 50
            ) //then multiply that random value by the vector
            let x = n * p.cos(e)
            let y = n * p.sin(e)
            p.vertex(x, y)
            p.ellipse(x, y, p.random(40, 60), p.random(40, 60))
          }
          p.endShape()
        }
        p.pop()

        p.push()
        cc = palettes[paletteIdx][p.int(p.random(10))]
        sc = palettes[paletteIdx][p.int(p.random(10))]
        for (let i = 0; i < 6; i++) {
          p.scale(0.98)
          let newc = p.lerpColor(sc, cc, i / 6)
          newc.setAlpha(130)
          p.fill(newc)
          p.beginShape()
          for (var e = 0; e < 2 * p.PI; e += 0.1) {
            let xoff = p.cos(e) + this.r //x is calculated by increasing the cos value by the angle step for each iteration
            let yoff = p.sin(e) + this.r //y is calculated by increasing the sin value by the angle step for each iteration
            let n = p.map(
              p.noise(xoff * this.r * 0.05, yoff * this.r * 0.05),
              0,
              1,
              this.dim - 26 - 50 - 50,
              this.dim + 200 - 50 - 50
            ) //then multiply that random value by the vector
            let x = n * p.cos(e)
            let y = n * p.sin(e)
            p.vertex(x, y)
            p.ellipse(x, y, p.random(40, 60), p.random(40, 60))
          }
          p.endShape()
        }
        p.pop()

        p.push()
        cc = palettes[paletteIdx][p.int(p.random(10))]
        sc = palettes[paletteIdx][p.int(p.random(10))]
        for (let i = 0; i < 6; i++) {
          p.scale(0.98)
          let newc = p.lerpColor(sc, cc, i / 6)
          newc.setAlpha(130)
          p.fill(newc)
          p.beginShape()
          for (var e = 0; e < 200 + 1; e++) {
            let xoff = p.cos(e) + this.r //x is calculated by increasing the cos value by the angle step for each iteration
            let yoff = p.sin(e) + this.r //y is calculated by increasing the sin value by the angle step for each iteration
            let n = p.map(
              p.noise(xoff * this.r * 0.05, yoff * this.r * 0.05),
              0,
              1,
              this.dim - 26 - 50 - 50 - 50,
              this.dim + 200 - 50 - 50 - 50
            ) //then multiply that random value by the vector
            let x = n * p.cos(e)
            let y = n * p.sin(e)
            p.vertex(x, y)
            p.ellipse(x, y, p.random(40, 60), p.random(40, 60))
          }
          p.endShape()
        }
        p.pop()

        p.push()
        cc = palettes[paletteIdx][p.int(p.random(10))]
        sc = palettes[paletteIdx][p.int(p.random(10))]
        for (let i = 0; i < 6; i++) {
          p.scale(0.98)
          let newc = p.lerpColor(sc, cc, i / 6)
          newc.setAlpha(130)
          p.fill(newc)
          p.beginShape()
          for (var e = 0; e < 200 + 1; e++) {
            let xoff = p.cos(e) + this.r //x is calculated by increasing the cos value by the angle step for each iteration
            let yoff = p.sin(e) + this.r //y is calculated by increasing the sin value by the angle step for each iteration
            let n = p.map(
              p.noise(xoff * this.r * 0.05, yoff * this.r * 0.05),
              0,
              1,
              this.dim - 26 - 50 - 50 - 50 - 50,
              this.dim + 200 - 50 - 50 - 50 - 50
            ) //then multiply that random value by the vector
            let x = n * p.cos(e)
            let y = n * p.sin(e)
            p.vertex(x, y)
            p.ellipse(x, y, p.random(40, 60), p.random(40, 60))
          }
          p.endShape()
        }
        p.pop()

        p.pop()
      }
    }

    class Voids {
      x: number
      y: number
      dim: number
      r: number
      num: number

      constructor(x: number, y: number, d: number, r: number, n: number) {
        this.x = x
        this.y = y
        this.dim = d
        this.r = r
        this.num = n
      }

      display() {
        p.push()
        p.translate(this.x, this.y)
        p.noStroke()

        p.push()
        let sc = palettes[paletteIdx][p.int(p.random(10))]
        p.stroke(sc)
        p.strokeWeight(8)
        p.noFill()
        for (let i = 0; i < this.num; i++) {
          p.scale(0.8)
          p.beginShape()
          for (var e = 0; e < 200 + 1; e++) {
            let x = p.cos(0.1 * e) //x is calculated by increasing the cos value by the angle step for each iteration
            let y = p.sin(0.1 * e) //y is calculated by increasing the sin value by the angle step for each iteration
            var v = p.createVector(x, y) //create a vector with the x and y components
            v.normalize() //then we normalize the vector (magnitude of 1)
            let n = p.map(
              p.noise(v.x * 0.8 + this.r * 1, v.y * 0.8 + this.r * 1),
              0,
              1,
              this.dim,
              this.dim + 300
            ) //with the noise function it's possible to create random values based on sone parameters that you can change with sliders
            v.mult(n) //then multiply that random value by the vector
            p.vertex(v.x, v.y)
          }
          p.endShape()
        }
        p.pop()

        p.pop()
      }
    }

    p.setup = () => {
      p.randomSeed(tokenId)
      paletteIdx = p.int(p.random(100))
      data.canvas = p.createCanvas(width, height)
      data.meta.attributes.push({
        trait_type: 'Genseng: An Infinite Regress',
        value: `Pallete: ${paletteNames[paletteIdx]}`,
      })
      palettes[0] = [
        p.color('#000000'),
        p.color('#FFFFFF'),
        p.color('#EE3733'),
        p.color('#F99A22'),
        p.color('#FFD72D'),
        p.color('#F6C8DD'),
        p.color('#9A4298'),
        p.color('#D64D9D'),
        p.color('#0DB266'),
        p.color('#5191CB'),
      ]
      palettes[1] = [
        p.color('#FF99C9'),
        p.color('#A799FF'),
        p.color('#8ACAFF'),
        p.color('#57FFEE'),
        p.color('#226600'),
        p.color('#001E70'),
        p.color('#FFE770'),
        p.color('#8700F5'),
        p.color('#5B00D1'),
        p.color('#A31AFF'),
      ]
      palettes[2] = [
        p.color('#FFCCF7'),
        p.color('#FF8FA2'),
        p.color('#FF0A99'),
        p.color('#00044D'),
        p.color('#42FFD0'),
        p.color('#42000F'),
        p.color('#570017'),
        p.color('#38FF4F'),
        p.color('#94009E'),
        p.color('#00AD68'),
      ]
      palettes[3] = [
        p.color('#00EB62'),
        p.color('#F5B800'),
        p.color('#00A1E6'),
        p.color('#DB0071'),
        p.color('#89FA00'),
        p.color('#FFD6E0'),
        p.color('#9E9100'),
        p.color('#FCFFFA'),
        p.color('#EB0008'),
        p.color('#000000'),
      ]
      palettes[4] = [
        p.color('#FF3D61'),
        p.color('#050400'),
        p.color('#F5F5FF'),
        p.color('#00CCF5'),
        p.color('#1A9CFF'),
        p.color('#2B9900'),
        p.color('#D1FF29'),
        p.color('#0069CC'),
        p.color('#5700D1'),
        p.color('#05B0FF'),
      ]
      palettes[5] = [
        p.color('#ECFFEB'),
        p.color('#47FF7B'),
        p.color('#2600BD'),
        p.color('#20009E'),
        p.color('#7E75FF'),
        p.color('#FF4242'),
        p.color('#FF5CFA'),
        p.color('#FF80A1'),
        p.color('#FFADC6'),
        p.color('#EBA400'),
      ]
      palettes[6] = [
        p.color('#00B3DB'),
        p.color('#006B8F'),
        p.color('#FAD000'),
        p.color('#FFF1D1'),
        p.color('#F50400'),
        p.color('#F0ADFF'),
        p.color('#F894FF'),
        p.color('#FF47B3'),
        p.color('#FF2E43'),
        p.color('#FF4A3D'),
      ]
      palettes[7] = [
        p.color('#4F9E00'),
        p.color('#A599FF'),
        p.color('#FCFFF5'),
        p.color('#57FFA0'),
        p.color('#FFED66'),
        p.color('#D10000'),
        p.color('#FFBA0A'),
        p.color('#9600E0'),
        p.color('#FF5257'),
        p.color('#FF691F'),
      ]
      palettes[8] = [
        p.color('#0A0000'),
        p.color('#0051FF'),
        p.color('#05C5FF'),
        p.color('#BD0026'),
        p.color('#FF0080'),
        p.color('#FFD09E'),
        p.color('#E4FF4D'),
        p.color('#6BFFBC'),
        p.color('#B3FFD9'),
        p.color('#D8FFAD'),
      ]
      palettes[9] = [
        p.color('#FF751A'),
        p.color('#FF9A1F'),
        p.color('#FFCD05'),
        p.color('#5AAD00'),
        p.color('#004C75'),
        p.color('#00587A'),
        p.color('#00C7B0'),
        p.color('#FF2483'),
        p.color('#5CE1FF'),
        p.color('#D8FFAD'),
      ]
      palettes[10] = [
        p.color('#004370'),
        p.color('#A3D7FF'),
        p.color('#85EDFF'),
        p.color('#FF75C1'),
        p.color('#FF5C64'),
        p.color('#FFBE57'),
        p.color('#FFC8B8'),
        p.color('#FF881A'),
        p.color('#FFEA4D'),
        p.color('#FFEA4D'),
      ]
      palettes[11] = [
        p.color('#EBC7FF'),
        p.color('#FF8FDD'),
        p.color('#EF0FFF'),
        p.color('#45009E'),
        p.color('#002A4D'),
        p.color('#BFFF1F'),
        p.color('#00FAFA'),
        p.color('#F1FF85'),
        p.color('#B3FF57'),
        p.color('#B4FF7A'),
      ]
      palettes[12] = [
        p.color('#FFF5F7'),
        p.color('#ADCAFF'),
        p.color('#776BFF'),
        p.color('#0056D6'),
        p.color('#0050C7'),
        p.color('#7A0800'),
        p.color('#E62E00'),
        p.color('#FFA70F'),
        p.color('#001729'),
        p.color('#007537'),
      ]
      palettes[13] = [
        p.color('#8A004E'),
        p.color('#6800BD'),
        p.color('#0008EB'),
        p.color('#14C0FF'),
        p.color('#42F9FF'),
        p.color('#F7FFCC'),
        p.color('#DCFF6B'),
        p.color('#47FFB9'),
        p.color('#E4DBFF'),
        p.color('#EBFFF8'),
      ]
      palettes[14] = [
        p.color('#00B87A'),
        p.color('#00AD3D'),
        p.color('#006618'),
        p.color('#004201'),
        p.color('#000000'),
        p.color('#0052D6'),
        p.color('#3F00C7'),
        p.color('#940094'),
        p.color('#FFE524'),
        p.color('#F5B800'),
      ]
      palettes[15] = [
        p.color('#FFC757'),
        p.color('#FF7A9C'),
        p.color('#004EF5'),
        p.color('#8AA3FF'),
        p.color('#D6DEFF'),
        p.color('#000C3D'),
        p.color('#000500'),
        p.color('#DBFFF7'),
        p.color('#75FFEF'),
        p.color('#9E005C'),
      ]
      palettes[16] = [
        p.color('#8FA800'),
        p.color('#F5BC00'),
        p.color('#F0A000'),
        p.color('#DB6A00'),
        p.color('#BD2F00'),
        p.color('#9214FF'),
        p.color('#F52EFF'),
        p.color('#FF7AB4'),
        p.color('#FFF3F0'),
        p.color('#803700'),
      ]
      palettes[17] = [
        p.color('#E2FFDB'),
        p.color('#99FFAF'),
        p.color('#0AFFBA'),
        p.color('#00CCBE'),
        p.color('#A8001C'),
        p.color('#006137'),
        p.color('#B3001B'),
        p.color('#0F0006'),
        p.color('#1800CC'),
        p.color('#3867FF'),
      ]
      palettes[18] = [
        p.color('#FFC5B8'),
        p.color('#FF7875'),
        p.color('#FFE5E8'),
        p.color('#8BFF85'),
        p.color('#FF7A93'),
        p.color('#007E8F'),
        p.color('#A80062'),
        p.color('#001729'),
        p.color('#007537'),
        p.color('#008A4C'),
      ]
      palettes[19] = [
        p.color('#008A87'),
        p.color('#00D6D3'),
        p.color('#C7FFD7'),
        p.color('#FA0032'),
        p.color('#66004B'),
        p.color('#3D0020'),
        p.color('#8300B3'),
        p.color('#FF5B1A'),
        p.color('#FFB67A'),
        p.color('#C20A00'),
      ]
      palettes[20] = [
        p.color('#008F7E'),
        p.color('#00E654'),
        p.color('#29FF74'),
        p.color('#D9FF80'),
        p.color('#FF4000'),
        p.color('#36006B'),
        p.color('#FF1F4F'),
        p.color('#FF7729'),
        p.color('#FF4D76'),
        p.color('#3A00C2'),
      ]
      palettes[21] = [
        p.color('#000B61'),
        p.color('#C700B0'),
        p.color('#FF1AE8'),
        p.color('#FF7092'),
        p.color('#FFD3BD'),
        p.color('#FFEAE5'),
        p.color('#FFEFD1'),
        p.color('#FFFFFF'),
        p.color('#00C7AC'),
        p.color('#EBF5FF'),
      ]
      palettes[22] = [
        p.color('#6B0000'),
        p.color('#6B0000'),
        p.color('#FFBA0A'),
        p.color('#FFCCCC'),
        p.color('#FFFFFF'),
        p.color('#FFCCF7'),
        p.color('#FF8FA2'),
        p.color('#FF0A99'),
        p.color('#FF2E70'),
        p.color('#D1FFF4'),
      ]
      palettes[23] = [
        p.color('#D2FF80'),
        p.color('#FFFFFA'),
        p.color('#FFD561'),
        p.color('#FF7F0F'),
        p.color('#FF1A1A'),
        p.color('#8500AD'),
        p.color('#841FFF'),
        p.color('#FF57EE'),
        p.color('#006EDB'),
        p.color('#148AFF'),
      ]
      palettes[24] = [
        p.color('#000024'),
        p.color('#001242'),
        p.color('#0095C7'),
        p.color('#005C7A'),
        p.color('#00101A'),
        p.color('#FF941A'),
        p.color('#FFDF52'),
        p.color('#C6FF7A'),
        p.color('#F9FF42'),
        p.color('#FFADC2'),
      ]
      palettes[25] = [
        p.color('#94FFB2'),
        p.color('#66E8FF'),
        p.color('#3DAEFF'),
        p.color('#4F9400'),
        p.color('#4F9400'),
        p.color('#004F80'),
        p.color('#FFADB0'),
        p.color('#FF333D'),
        p.color('#001E70'),
        p.color('#DB00A8'),
      ]
      palettes[26] = [
        p.color('#9861FF'),
        p.color('#FFEEDB'),
        p.color('#83008A'),
        p.color('#DB0050'),
        p.color('#29FFBB'),
        p.color('#008EAD'),
        p.color('#00F098'),
        p.color('#00D150'),
        p.color('#008F45'),
        p.color('#006B62'),
      ]
      palettes[27] = [
        p.color('#F53500'),
        p.color('#FFAA75'),
        p.color('#0081D6'),
        p.color('#00649E'),
        p.color('#005C75'),
        p.color('#002252'),
        p.color('#000F08'),
        p.color('#004F52'),
        p.color('#69008F'),
        p.color('#2E0047'),
      ]
      palettes[28] = [
        p.color('#EBFFE5'),
        p.color('#B8D5FF'),
        p.color('#8FFFF9'),
        p.color('#38FFDE'),
        p.color('#E00087'),
        p.color('#380000'),
        p.color('#8400D1'),
        p.color('#00A7D1'),
        p.color('#001414'),
        p.color('#8A0030'),
      ]
      palettes[29] = [
        p.color('#9EE8FF'),
        p.color('#00EB8D'),
        p.color('#00EB8D'),
        p.color('#8F0026'),
        p.color('#2E0500'),
        p.color('#AD0031'),
        p.color('#FF293E'),
        p.color('#FF6A4D'),
        p.color('#E00087'),
        p.color('#9E0020'),
      ]
      palettes[30] = [
        p.color('#A8002A'),
        p.color('#FFA98A'),
        p.color('#FFE5D6'),
        p.color('#FFE5D6'),
        p.color('#FF243D'),
        p.color('#47ACFF'),
        p.color('#003E8F'),
        p.color('#6669FF'),
        p.color('#002B38'),
        p.color('#57FFA0'),
      ]
      palettes[31] = [
        p.color('#007BE0'),
        p.color('#14B5FF'),
        p.color('#1AD5FF'),
        p.color('#FF9029'),
        p.color('#FF0905'),
        p.color('#FF4D64'),
        p.color('#FF794D'),
        p.color('#FFF5D6'),
        p.color('#00C73C'),
        p.color('#FFF82E'),
      ]
      palettes[32] = [
        p.color('#FFDBDC'),
        p.color('#FF4D82'),
        p.color('#8A003E'),
        p.color('#001E70'),
        p.color('#00333D'),
        p.color('#BBFF4D'),
        p.color('#DBFFB8'),
        p.color('#AACC00'),
        p.color('#005AA3'),
        p.color('#A3E2FF'),
      ]
      palettes[33] = [
        p.color('#C100D6'),
        p.color('#1AF4FF'),
        p.color('#FFD28A'),
        p.color('#FF6542'),
        p.color('#99008A'),
        p.color('#002424'),
        p.color('#005457'),
        p.color('#F55200'),
        p.color('#000038'),
        p.color('#FF6557'),
      ]
      palettes[34] = [
        p.color('#479AFF'),
        p.color('#4DCFFF'),
        p.color('#FF80BF'),
        p.color('#FFB999'),
        p.color('#FF858F'),
        p.color('#9E001D'),
        p.color('#FF0544'),
        p.color('#4E00AD'),
        p.color('#9AFF47'),
        p.color('#FAFF5C'),
      ]
      palettes[35] = [
        p.color('#002925'),
        p.color('#003D38'),
        p.color('#F0D6FF'),
        p.color('#FF8C00'),
        p.color('#6B0059'),
        p.color('#645CFF'),
        p.color('#1FFF96'),
        p.color('#0FCFFF'),
        p.color('#FF5C95'),
        p.color('#FF477B'),
      ]
      palettes[36] = [
        p.color('#4DFFF0'),
        p.color('#1FE5FF'),
        p.color('#674DFF'),
        p.color('#FF80DB'),
        p.color('#BFA3FF'),
        p.color('#005700'),
        p.color('#A8005F'),
        p.color('#9E0B00'),
        p.color('#FF0000'),
        p.color('#940F00'),
      ]
      palettes[37] = [
        p.color('#C2FFFF'),
        p.color('#61FFD7'),
        p.color('#00D19D'),
        p.color('#00E0D9'),
        p.color('#003309'),
        p.color('#00192E'),
        p.color('#004099'),
        p.color('#FF145B'),
        p.color('#4900C7'),
        p.color('#2200A8'),
      ]
      palettes[38] = [
        p.color('#F51919'),
        p.color('#F73097'),
        p.color('#FA3E69'),
        p.color('#FB84B5'),
        p.color('#FB93F1'),
        p.color('#0805AD'),
        p.color('#59058A'),
        p.color('#FCFFFA'),
        p.color('#F5D400'),
        p.color('#020D3B'),
      ]
      palettes[39] = [
        p.color('#FFA3A3'),
        p.color('#FFB8B8'),
        p.color('#7ACAFF'),
        p.color('#C70000'),
        p.color('#990000'),
        p.color('#FF5842'),
        p.color('#660003'),
        p.color('#D10046'),
        p.color('#FF4B1A'),
        p.color('#330000'),
      ]
      palettes[40] = [
        p.color('#E6DE00'),
        p.color('#7D9900'),
        p.color('#FFFCE5'),
        p.color('#680075'),
        p.color('#FF211A'),
        p.color('#A142FF'),
        p.color('#4000F0'),
        p.color('#002B4D'),
        p.color('#002E2C'),
        p.color('#0F0A00'),
      ]
      palettes[41] = [
        p.color('#FFC2F6'),
        p.color('#FEA8FF'),
        p.color('#B175FF'),
        p.color('#7088FF'),
        p.color('#6BE1FF'),
        p.color('#000061'),
        p.color('#8F006B'),
        p.color('#FFE3C2'),
        p.color('#D11800'),
        p.color('#9EFFF9'),
      ]
      palettes[42] = [
        p.color('#001638'),
        p.color('#100075'),
        p.color('#BC00F5'),
        p.color('#FF70BF'),
        p.color('#FFA8B1'),
        p.color('#FFDD75'),
        p.color('#FF9D14'),
        p.color('#EB5600'),
        p.color('#FF4405'),
        p.color('#FFD6E9'),
      ]
      palettes[43] = [
        p.color('#000C33'),
        p.color('#001E52'),
        p.color('#003F7A'),
        p.color('#008CB3'),
        p.color('#FFFCFA'),
        p.color('#FF00A6'),
        p.color('#FF667A'),
        p.color('#B8DFFF'),
        p.color('#FFD57A'),
        p.color('#FFE770'),
      ]
      palettes[44] = [
        p.color('#FF6105'),
        p.color('#FFE91F'),
        p.color('#81CC00'),
        p.color('#5B8000'),
        p.color('#FFB029'),
        p.color('#9E4C00'),
        p.color('#E5FFFF'),
        p.color('#00D8DB'),
        p.color('#7A000C'),
        p.color('#FF38AF'),
      ]
      palettes[45] = [
        p.color('#FF5842'),
        p.color('#00B8EB'),
        p.color('#F1E0FF'),
        p.color('#00FF59'),
        p.color('#0018B3'),
        p.color('#C2003D'),
        p.color('#A8005D'),
        p.color('#B3002A'),
        p.color('#007546'),
        p.color('#A30021'),
      ]
      palettes[46] = [
        p.color('#001147'),
        p.color('#3CBD00'),
        p.color('#FFC800'),
        p.color('#FF8629'),
        p.color('#FFFFFF'),
        p.color('#66C4FF'),
        p.color('#94E4FF'),
        p.color('#FF1438'),
        p.color('#BFBDFF'),
        p.color('#FFB3C3'),
      ]
      palettes[47] = [
        p.color('#FFA69E'),
        p.color('#FFF5D6'),
        p.color('#ADFFEF'),
        p.color('#8FF0FF'),
        p.color('#003FD1'),
        p.color('#004280'),
        p.color('#0069D1'),
        p.color('#007FAD'),
        p.color('#17005C'),
        p.color('#2500E0'),
      ]
      palettes[48] = [
        p.color('#ADE4FF'),
        p.color('#00A8A8'),
        p.color('#F5CC00'),
        p.color('#FFA200'),
        p.color('#F08800'),
        p.color('#3D001F'),
        p.color('#FF4000'),
        p.color('#FFA98A'),
        p.color('#94FF97'),
        p.color('#FF4B1F'),
      ]
      palettes[49] = [
        p.color('#4DACFF'),
        p.color('#942A00'),
        p.color('#C2E8FF'),
        p.color('#2483FF'),
        p.color('#0000E6'),
        p.color('#FF1F84'),
        p.color('#7400C2'),
        p.color('#3400AD'),
        p.color('#FF825C'),
        p.color('#FFA114'),
      ]
      palettes[50] = [
        p.color('#29C2FF'),
        p.color('#61ABFF'),
        p.color('#94BBFF'),
        p.color('#BDE0FF'),
        p.color('#FF1A85'),
        p.color('#004C8A'),
        p.color('#FF66B3'),
        p.color('#D6000B'),
        p.color('#FF5D52'),
        p.color('#5CFF9D'),
      ]
      palettes[51] = [
        p.color('#FFE5ED'),
        p.color('#FFC4BD'),
        p.color('#FFA39E'),
        p.color('#FFF79E'),
        p.color('#FFFF75'),
        p.color('#495C00'),
        p.color('#A7BD00'),
        p.color('#C75000'),
        p.color('#004C80'),
        p.color('#DFFF0F'),
      ]
      palettes[52] = [
        p.color('#0070FA'),
        p.color('#33CFFF'),
        p.color('#4DFFC6'),
        p.color('#85FF97'),
        p.color('#A3FFA8'),
        p.color('#40006B'),
        p.color('#FF470F'),
        p.color('#FF9705'),
        p.color('#000000'),
        p.color('#050000'),
      ]
      palettes[53] = [
        p.color('#00161F'),
        p.color('#004D6B'),
        p.color('#00ACEB'),
        p.color('#70FF7E'),
        p.color('#F2FFD6'),
        p.color('#FFD1D1'),
        p.color('#FF6B93'),
        p.color('#FF928A'),
        p.color('#BD0097'),
        p.color('#FF75B3'),
      ]
      palettes[54] = [
        p.color('#450061'),
        p.color('#3700B8'),
        p.color('#006CF0'),
        p.color('#5CE7FF'),
        p.color('#B8F3FF'),
        p.color('#FFBF47'),
        p.color('#FFB3C3'),
        p.color('#FFCE1F'),
        p.color('#00D1A7'),
        p.color('#FF4938'),
      ]
      palettes[55] = [
        p.color('#A3FF47'),
        p.color('#D6FF75'),
        p.color('#008F58'),
        p.color('#00EB6D'),
        p.color('#57003A'),
        p.color('#FF2605'),
        p.color('#D12300'),
        p.color('#572100'),
        p.color('#290004'),
        p.color('#D12300'),
      ]
      palettes[56] = [
        p.color('#D1FFA3'),
        p.color('#AAFF75'),
        p.color('#61FFFA'),
        p.color('#2ECBFF'),
        p.color('#0073E6'),
        p.color('#FF1443'),
        p.color('#001938'),
        p.color('#004FA8'),
        p.color('#FF42E3'),
        p.color('#001E70'),
      ]
      palettes[57] = [
        p.color('#FFE15C'),
        p.color('#FFF67A'),
        p.color('#D9FF80'),
        p.color('#7DFF7A'),
        p.color('#80FFC8'),
        p.color('#004217'),
        p.color('#B30021'),
        p.color('#FF4D7C'),
        p.color('#B8EAFF'),
        p.color('#6BC6FF'),
      ]
      palettes[58] = [
        p.color('#001938'),
        p.color('#004FA8'),
        p.color('#24FFF0'),
        p.color('#86FF57'),
        p.color('#BFFF80'),
        p.color('#FFBD42'),
        p.color('#EB0056'),
        p.color('#FFC599'),
        p.color('#FF3414'),
        p.color('#FF80A6'),
      ]
      palettes[59] = [
        p.color('#420000'),
        p.color('#FFFFFF'),
        p.color('#005CB3'),
        p.color('#0FD7FF'),
        p.color('#A3CBFF'),
        p.color('#FF3729'),
        p.color('#DB0066'),
        p.color('#FFD500'),
        p.color('#FF5729'),
        p.color('#FF7B00'),
      ]
      palettes[60] = [
        p.color('#FF2B24'),
        p.color('#FF6D57'),
        p.color('#006B60'),
        p.color('#00EBA4'),
        p.color('#FFF04D'),
        p.color('#8FA800'),
        p.color('#F5BC00'),
        p.color('#DBFFF7'),
        p.color('#75FFEF'),
        p.color('#FFE6A8'),
      ]
      palettes[61] = [
        p.color('#FF6933'),
        p.color('#FFC599'),
        p.color('#FFFFC2'),
        p.color('#004E8A'),
        p.color('#0068B8'),
        p.color('#E00087'),
        p.color('#9E0020'),
        p.color('#9000B8'),
        p.color('#660055'),
        p.color('#000080'),
      ]
      palettes[62] = [
        p.color('#FF8AF1'),
        p.color('#2CFF14'),
        p.color('#FA7D00'),
        p.color('#80000B'),
        p.color('#0A0200'),
        p.color('#FF0A9D'),
        p.color('#000E75'),
        p.color('#FFFD80'),
        p.color('#940023'),
        p.color('#0014F0'),
      ]
      palettes[63] = [
        p.color('#EB7100'),
        p.color('#FFD7A8'),
        p.color('#FFC180'),
        p.color('#00C8F5'),
        p.color('#75E8FF'),
        p.color('#00E069'),
        p.color('#005AAD'),
        p.color('#000000'),
        p.color('#000000'),
        p.color('#009DA8'),
      ]
      palettes[64] = [
        p.color('#FEE1E5'),
        p.color('#FE535E'),
        p.color('#360217'),
        p.color('#5D0404'),
        p.color('#64FCE5'),
        p.color('#058F17'),
        p.color('#48FABE'),
        p.color('#A9F70D'),
        p.color('#EDFF85'),
        p.color('#7307F8'),
      ]
      palettes[65] = [
        p.color('#85006E'),
        p.color('#00A5AD'),
        p.color('#26FF1F'),
        p.color('#C2FF52'),
        p.color('#FF6D2E'),
        p.color('#FF575F'),
        p.color('#FF822E'),
        p.color('#FFCD42'),
        p.color('#FF335F'),
        p.color('#FFD23D'),
      ]
      palettes[66] = [
        p.color('#008A87'),
        p.color('#00D6D3'),
        p.color('#C7FFD7'),
        p.color('#FA0032'),
        p.color('#66004B'),
        p.color('#002400'),
        p.color('#DB0054'),
        p.color('#AD000E'),
        p.color('#FF0022'),
        p.color('#00182E'),
      ]
      palettes[67] = [
        p.color('#FF462E'),
        p.color('#FFB92E'),
        p.color('#D5FF2E'),
        p.color('#36FA00'),
        p.color('#00C756'),
        p.color('#940060'),
        p.color('#25B800'),
        p.color('#2E4AFF'),
        p.color('#3374FF'),
        p.color('#57BEFF'),
      ]
      palettes[68] = [
        p.color('#00B3DB'),
        p.color('#006B8F'),
        p.color('#FAD000'),
        p.color('#FFF1D1'),
        p.color('#F50400'),
        p.color('#8A0200'),
        p.color('#FF1F4F'),
        p.color('#FF7729'),
        p.color('#00F06C'),
        p.color('#C880FF'),
      ]
      palettes[69] = [
        p.color('#006137'),
        p.color('#0FFF33'),
        p.color('#A3C3FF'),
        p.color('#52B1FF'),
        p.color('#BC1FFF'),
        p.color('#FFDE66'),
        p.color('#FF7B42'),
        p.color('#FF333D'),
        p.color('#CC004B'),
        p.color('#D2FF8F'),
      ]
      palettes[70] = [
        p.color('#002266'),
        p.color('#7AF0FF'),
        p.color('#FFD6E9'),
        p.color('#FA0000'),
        p.color('#FF2B0A'),
        p.color('#3CBD00'),
        p.color('#FFC800'),
        p.color('#FF8629'),
        p.color('#FFAB24'),
        p.color('#EB0800'),
      ]
      palettes[71] = [
        p.color('#00FA8E'),
        p.color('#66FFAB'),
        p.color('#B3FFEE'),
        p.color('#E0FFFF'),
        p.color('#F5FFF7'),
        p.color('#2E0F00'),
        p.color('#FFB914'),
        p.color('#1300BD'),
        p.color('#FF4B14'),
        p.color('#FFC814'),
      ]
      palettes[72] = [
        p.color('#8FFFE7'),
        p.color('#57FFDD'),
        p.color('#1FFFA5'),
        p.color('#00DB45'),
        p.color('#9E1D00'),
        p.color('#FF643D'),
        p.color('#FF875C'),
        p.color('#6B00BD'),
        p.color('#613A00'),
        p.color('#002DF5'),
      ]
      palettes[73] = [
        p.color('#4D0000'),
        p.color('#94FF66'),
        p.color('#EEFFB8'),
        p.color('#FF7F0F'),
        p.color('#FF1A1A'),
        p.color('#FF0F2F'),
        p.color('#FF9F1A'),
        p.color('#F50093'),
        p.color('#FF7842'),
        p.color('#B30077'),
      ]
      palettes[74] = [
        p.color('#3C5C00'),
        p.color('#AD0090'),
        p.color('#FAA200'),
        p.color('#BAFF42'),
        p.color('#D7FF80'),
        p.color('#D7B3FF'),
        p.color('#FFDBDC'),
        p.color('#FF4D82'),
        p.color('#FF1A1A'),
        p.color('#D6FFF8'),
      ]
      palettes[75] = [
        p.color('#FFD30F'),
        p.color('#F56E00'),
        p.color('#E00040'),
        p.color('#6505FF'),
        p.color('#0095FF'),
        p.color('#4DFFF6'),
        p.color('#246DFF'),
        p.color('#3F009E'),
        p.color('#1AFF9C'),
        p.color('#FFFAFA'),
      ]
      palettes[76] = [
        p.color('#020047'),
        p.color('#990096'),
        p.color('#F00048'),
        p.color('#FF4E47'),
        p.color('#FFC96B'),
        p.color('#1F84FF'),
        p.color('#FF9B80'),
        p.color('#8AFFEB'),
        p.color('#FFCABD'),
        p.color('#C7FFBD'),
      ]
      palettes[77] = [
        p.color('#15009E'),
        p.color('#33B300'),
        p.color('#84C200'),
        p.color('#C5DB00'),
        p.color('#CCF000'),
        p.color('#FFB3DB'),
        p.color('#FFEBF4'),
        p.color('#FDFFE5'),
        p.color('#FF3D1F'),
        p.color('#FF3F38'),
      ]
      palettes[78] = [
        p.color('#7AFFF2'),
        p.color('#6BFFB8'),
        p.color('#1AFFAB'),
        p.color('#00BD55'),
        p.color('#008A3C'),
        p.color('#FFC7B3'),
        p.color('#FFABA3'),
        p.color('#FF9B70'),
        p.color('#D800F5'),
        p.color('#FFC2C8'),
      ]
      palettes[79] = [
        p.color('#38FF9C'),
        p.color('#0078E0'),
        p.color('#E70FFF'),
        p.color('#F5FFEB'),
        p.color('#FF4766'),
        p.color('#FFF5F7'),
        p.color('#ADCAFF'),
        p.color('#E5F1FF'),
        p.color('#FFB647'),
        p.color('#FF9A2E'),
      ]
      palettes[80] = [
        p.color('#EDFFD6'),
        p.color('#B0FF80'),
        p.color('#FFFF80'),
        p.color('#FFB947'),
        p.color('#FF8605'),
        p.color('#9200E0'),
        p.color('#3849FF'),
        p.color('#FF4747'),
        p.color('#EB0056'),
        p.color('#BD004F'),
      ]
      palettes[81] = [
        p.color('#006D8F'),
        p.color('#F09000'),
        p.color('#85DAFF'),
        p.color('#ABFF0F'),
        p.color('#1AD1FF'),
        p.color('#FF1AA3'),
        p.color('#FA00C0'),
        p.color('#FF42A1'),
        p.color('#20008A'),
        p.color('#DB0F00'),
      ]
      palettes[82] = [
        p.color('#008500'),
        p.color('#007506'),
        p.color('#108A00'),
        p.color('#03A800'),
        p.color('#1AFF1A'),
        p.color('#ADD1FF'),
        p.color('#8D5CFF'),
        p.color('#5CFFD9'),
        p.color('#A3CEFF'),
        p.color('#E0FFEA'),
      ]
      palettes[83] = [
        p.color('#FF4751'),
        p.color('#E6002E'),
        p.color('#003E57'),
        p.color('#F1FFE5'),
        p.color('#E61B00'),
        p.color('#FFFF61'),
        p.color('#FEFFEB'),
        p.color('#FF9494'),
        p.color('#FFEFD1'),
        p.color('#47FFF3'),
      ]
      palettes[84] = [
        p.color('#001413'),
        p.color('#FAFFFE'),
        p.color('#700200'),
        p.color('#AD2B00'),
        p.color('#FFB914'),
        p.color('#EF0FFF'),
        p.color('#00C2AB'),
        p.color('#00A846'),
        p.color('#16E000'),
        p.color('#00A7CC'),
      ]
      palettes[85] = [
        p.color('#520007'),
        p.color('#750800'),
        p.color('#A34100'),
        p.color('#FF890A'),
        p.color('#FFFC47'),
        p.color('#0058BD'),
        p.color('#4DA0FF'),
        p.color('#FFAD5C'),
        p.color('#FF29AD'),
        p.color('#D100AB'),
      ]
      palettes[86] = [
        p.color('#DAFF85'),
        p.color('#FFE380'),
        p.color('#FFE357'),
        p.color('#059BFF'),
        p.color('#003BA8'),
        p.color('#500085'),
        p.color('#2500CC'),
        p.color('#6B8EFF'),
        p.color('#FF573D'),
        p.color('#FF99B1'),
      ]
      palettes[87] = [
        p.color('#E3FFE0'),
        p.color('#57FF52'),
        p.color('#00E6D6'),
        p.color('#0000B8'),
        p.color('#FFBF47'),
        p.color('#000505'),
        p.color('#20008A'),
        p.color('#FFAA80'),
        p.color('#FF928A'),
        p.color('#FFC2A3'),
      ]
      palettes[88] = [
        p.color('#7200F5'),
        p.color('#00F0E8'),
        p.color('#FFDEBD'),
        p.color('#FFBC57'),
        p.color('#FF2934'),
        p.color('#D14900'),
        p.color('#FF6B7A'),
        p.color('#440066'),
        p.color('#FF0051'),
        p.color('#FF8605'),
      ]
      palettes[89] = [
        p.color('#F5F5FF'),
        p.color('#FF7057'),
        p.color('#1A9CFF'),
        p.color('#0046D1'),
        p.color('#240012'),
        p.color('#36006B'),
        p.color('#00DB6A'),
        p.color('#ECFF1F'),
        p.color('#00587A'),
        p.color('#998000'),
      ]
      palettes[90] = [
        p.color('#FFADA8'),
        p.color('#66FF99'),
        p.color('#00D150'),
        p.color('#008F45'),
        p.color('#006B62'),
        p.color('#5F57FF'),
        p.color('#F02000'),
        p.color('#242000'),
        p.color('#9E0B00'),
        p.color('#FF0000'),
      ]
      palettes[91] = [
        p.color('#36006B'),
        p.color('#5F00B3'),
        p.color('#245EFF'),
        p.color('#61FFFC'),
        p.color('#8AFFAF'),
        p.color('#A8FFFE'),
        p.color('#FFF194'),
        p.color('#80FF9F'),
        p.color('#ADFFED'),
        p.color('#004D1A'),
      ]
      palettes[92] = [
        p.color('#B8E7FF'),
        p.color('#FF57BE'),
        p.color('#EB0066'),
        p.color('#002794'),
        p.color('#1AFF90'),
        p.color('#FFBE57'),
        p.color('#00587A'),
        p.color('#FFCE52'),
        p.color('#FFA257'),
        p.color('#0F0014'),
      ]
      palettes[93] = [
        p.color('#47003F'),
        p.color('#C70007'),
        p.color('#E1FF5C'),
        p.color('#F1FF99'),
        p.color('#EEFFBD'),
        p.color('#8080FF'),
        p.color('#9575FF'),
        p.color('#DE70FF'),
        p.color('#009959'),
        p.color('#006B24'),
      ]
      palettes[94] = [
        p.color('#00CDDB'),
        p.color('#57BEFF'),
        p.color('#F1E0FF'),
        p.color('#00332B'),
        p.color('#525DFF'),
        p.color('#480052'),
        p.color('#2300AD'),
        p.color('#E000A8'),
        p.color('#450061'),
        p.color('#3700B8'),
      ]
      palettes[95] = [
        p.color('#FFFFFF'),
        p.color('#00171F'),
        p.color('#003357'),
        p.color('#007EA8'),
        p.color('#00A4E6'),
        p.color('#EB0008'),
        p.color('#F5D400'),
        p.color('#FF5842'),
        p.color('#14B5FF'),
        p.color('#EB0062'),
      ]
      palettes[96] = [
        p.color('#9861FF'),
        p.color('#FFEEDB'),
        p.color('#83008A'),
        p.color('#DB0050'),
        p.color('#29FFBB'),
        p.color('#008F85'),
        p.color('#007A12'),
        p.color('#439400'),
        p.color('#FF1F48'),
        p.color('#FF0F2F'),
      ]
      palettes[97] = [
        p.color('#FF3B0F'),
        p.color('#D6000B'),
        p.color('#1F39FF'),
        p.color('#5CFF9D'),
        p.color('#C0FF99'),
        p.color('#FFB8C2'),
        p.color('#FFCA75'),
        p.color('#36E600'),
        p.color('#A0FF47'),
        p.color('#A8FFCC'),
      ]
      palettes[98] = [
        p.color('#004217'),
        p.color('#B30021'),
        p.color('#FF4D7C'),
        p.color('#B8EAFF'),
        p.color('#8AFFF7'),
        p.color('#F0FFDB'),
        p.color('#F3FF99'),
        p.color('#BBFFB3'),
        p.color('#66FF70'),
        p.color('#24FFBD'),
      ]
      palettes[99] = [
        p.color('#FA003E'),
        p.color('#FFDFB3'),
        p.color('#DB4900'),
        p.color('#660A00'),
        p.color('#FFE605'),
        p.color('#005457'),
        p.color('#000505'),
        p.color('#20008A'),
        p.color('#A599FF'),
        p.color('#57FFA0'),
      ]

      p.background(palettes[paletteIdx][p.int(p.random(10))])
      onions.push(
        new Onion(p.random(width), p.random(height), p.random(100, 300))
      )
      onions[0].display()

      while (onions.length < p.int(p.random(40, 70))) {
        let overlap = false
        let o = new Onion(p.random(width), p.random(height), p.random(100, 300))

        for (let j = 0; j < onions.length; j++) {
          if (
            p.dist(o.x, o.y, onions[j].x, onions[j].y) <
            o.dim + onions[j].dim
          ) {
            overlap = true
          }
        }

        if (!overlap) {
          onions.push(o)
        }
      }

      blobs.push(
        new Blb(
          p.random(width),
          p.random(width),
          p.random(30, 200),
          p.random(32, 100)
        )
      )
      blobs[0].display()
      while (blobs.length < 30) {
        var overlap = false
        let o = new Blb(
          p.random(width),
          p.random(width),
          p.random(30, 200),
          p.random(32, 100)
        )
        for (let j = 0; j < blobs.length; j++) {
          if (
            p.dist(o.x, o.y, blobs[j].x, blobs[j].y) <
            o.dim + (blobs[j].dim + 100)
          ) {
            overlap = true
          }
        }

        if (!overlap) {
          blobs.push(o)
        }
      }

      for (let i = 0; i < blobs.length; i++) {
        blobs[i].display()
      }

      for (let i = 0; i < onions.length; i++) {
        onions[i].display()
      }

      oblobs.push(
        new Blb(
          p.random(width),
          p.random(width),
          p.random(10, 300),
          p.random(32, 100)
        )
      )
      oblobs[0].display()
      while (oblobs.length < 12) {
        var overlap = false
        let o = new Blb(
          p.random(width),
          p.random(width),
          p.random(10, 300),
          p.random(32, 100)
        )
        for (let j = 0; j < oblobs.length; j++) {
          if (
            p.dist(o.x, o.y, oblobs[j].x, oblobs[j].y) <
            o.dim + (oblobs[j].dim + 100)
          ) {
            overlap = true
          }
        }

        if (!overlap) {
          oblobs.push(o)
        }
      }

      for (let i = 0; i < oblobs.length; i++) {
        oblobs[i].display()
      }

      for (let i = 0; i < p.int(p.random(0, 20)); i++) {
        voids.push(
          new Voids(
            p.random(width),
            p.random(width),
            p.random(50, 150),
            p.random(32, 1000),
            p.int(p.random(1, 10))
          )
        )
        voids[i].display()
      }
    }

    p.draw = () => {}
  }

  return {
    data,
    sketch,
  }
}
