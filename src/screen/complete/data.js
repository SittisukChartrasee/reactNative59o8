import images from '../../config/images'
const colors = {
  item1: rgb(29, 58, 97),
  item2: rgb(170, 186, 194),
  item3: rgb(123, 191, 159),
  item4: rgb(137, 36, 33),
  item5: rgb(212, 188, 144),
}

export const imageRisk = [
  '',
  images.iconrisk1,
  images.iconrisk2,
  images.iconrisk3,
  images.iconrisk4,
  images.iconrisk5,
  images.iconrisk6,
  images.iconrisk7,
  images.iconrisk8,
]

// export const data = [
//   {
//     title: 'ความเสี่ยงต่ำ',
//     disTitle: 'ผลตอบแทนที่คาดหวังโดยเฉลี่ย 3% ต่อปี',
//     image: images.iconrisk12,
//     discription: 'ท่านเป็นนักลงทุนที่รับความเสี่ยงได้ต่ำ ต้องการผลตอบแทนจากการลงทุนมากกว่าการฝากเงินธนาคารเล็กน้อย และมีวัตถุประสงค์การลงทุนในระยะสั้นๆ',
//     risk: {
//       title: 'K-FITS',
//       time: 'ณ. วันที่ 4 ม.ค. 62',
//       data: [
//         {
//           title: 'ตราสารหนี้ไทย',
//           color: colors.item1,
//           percent: 34,
//         }, {
//           title: 'ตราสารหนี้ระยะสั้น',
//           color: colors.item2,
//           percent: 7,
//         }, {
//           title: 'หุ้นต่างประเทศ',
//           color: colors.item3,
//           percent: 29,
//         }, {
//           title: 'หุ้นไทย',
//           color: colors.item4,
//           percent: 23,
//         }, {
//           title: 'กองทุนทางเลือก',
//           color: colors.item5,
//           percent: 7,
//         }
//       ]
//     }
//   }, {
//     title: 'ความเสี่ยงปานกลางค่อนข้างต่ำ',
//     disTitle: 'ผลตอบแทนที่คาดหวังโดยเฉลี่ย 5.5% ต่อปี',
//     image: images.iconrisk34,
//     discription: 'ท่านเป็นนักลงทุนที่ยอมรับความเสี่ยงได้ปานกลางถึงค่อนข้างต่ำ จัดเป็นผู้ลงทุนที่รับความเสี่ยงได้น้อย เน้นปกป้องเงินลงทุน โดยมุ่งหวังโอกาสรับผลตอบแทนที่สม่ำเสมอจากการลงทุน',
//     risk: {
//       title: 'K-FITS',
//       time: 'ณ. วันที่ 4 ม.ค. 62',
//       data: [
//         {
//           title: 'ตราสารหนี้ไทย',
//           color: colors.item1,
//           percent: 34,
//         }, {
//           title: 'ตราสารหนี้ระยะสั้น',
//           color: colors.item2,
//           percent: 7,
//         }, {
//           title: 'หุ้นต่างประเทศ',
//           color: colors.item3,
//           percent: 29,
//         }, {
//           title: 'หุ้นไทย',
//           color: colors.item4,
//           percent: 23,
//         }, {
//           title: 'กองทุนทางเลือก',
//           color: colors.item5,
//           percent: 7,
//         }
//       ]
//     }
//   }, {
//     title: 'ความเสี่ยงปานกลางค่อนข้างสูง',
//     disTitle: 'ผลตอบแทนที่คาดหวังโดยเฉลี่ย 7.5% ต่อปี',
//     image: images.iconrisk56,
//     discription: 'ท่านเป็นนักลงทุนที่รับความเสี่ยงได้ปานกลางถึงค่อนข้างสูง สามารถยอมรับมูลค่าการลงทุนที่ลดลงเป็นครั้งคราวได้',
//     risk: {
//       title: 'K-FITS',
//       time: 'ณ. วันที่ 4 ม.ค. 62',
//       data: [
//         {
//           title: 'ตราสารหนี้ไทย',
//           color: colors.item1,
//           percent: 34,
//         }, {
//           title: 'ตราสารหนี้ระยะสั้น',
//           color: colors.item2,
//           percent: 7,
//         }, {
//           title: 'หุ้นต่างประเทศ',
//           color: colors.item3,
//           percent: 29,
//         }, {
//           title: 'หุ้นไทย',
//           color: colors.item4,
//           percent: 23,
//         }, {
//           title: 'กองทุนทางเลือก',
//           color: colors.item5,
//           percent: 7,
//         }
//       ]
//     }
//   }, {
//     title: 'ความเสี่ยงสูง',
//     disTitle: 'ผลตอบแทนที่คาดหวังโดยเฉลี่ย 10% ต่อปี',
//     image: images.iconrisk78,
//     discription: 'ท่านเป็นนักลงทุนที่รับความเสี่ยงได้สูง สามารถยอมรับความผันผวนของตลาดได้ ยอมรับการขาดทุนได้ หากมีโอกาสได้รับผลตอบแทนสูงจากการลงทุน',
//     risk: {
//       title: 'K-FITS',
//       time: 'ณ. วันที่ 4 ม.ค. 62',
//       data: [
//         {
//           title: 'ตราสารหนี้ไทย',
//           color: colors.item1,
//           percent: 34,
//         }, {
//           title: 'ตราสารหนี้ระยะสั้น',
//           color: colors.item2,
//           percent: 7,
//         }, {
//           title: 'หุ้นต่างประเทศ',
//           color: colors.item3,
//           percent: 29,
//         }, {
//           title: 'หุ้นไทย',
//           color: colors.item4,
//           percent: 23,
//         }, {
//           title: 'กองทุนทางเลือก',
//           color: colors.item5,
//           percent: 7,
//         }
//       ]
//     }
//   }
// ]