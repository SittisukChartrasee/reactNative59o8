import { CHANGE_SUITTEST } from '../types'
const init = {
  suittest: [
    {
      title: 'ปัจจุบันท่านอายุเท่าไหร่ ?',
      choice: ['มากกว่า 55 ปี', '45 - 55 ปี', '35 - 44 ปี', 'น้อยกว่า 35 ปี'],
    }, {
      title: 'ปัจจุบันท่านมีภาระค่าใช้จ่ายรายเดือน คิดเป็นกี่% ของรายได้ทั้งหมด',
      choice: ['มากกว่า 75%', '51% - 75%', '25% - 50%', 'น้อยกว่า 25%'],
    }, {
      title: 'ท่านมีสถานะทางการเงินในปัจจุบันอย่างไร',
      choice: [
        'ท่านมีสถานะทางการเงินในปัจจุบันอย่างไร',
        'มีทรัพย์สินเท่ากับหนี้สิน',
        'มีทรัพย์สินมากกว่าหนี้สิน',
        'มีความมั่นใจว่ามีเงินออม/เงินลงทุนเพียงพอสำหรับการใช้ชีวิตหลังเกษียณแล้ว'
      ],
    }, {
      title: 'ท่านมีประสบการณ์ หรือมีความรู้ในการลงทุนในทรัพย์สินกลุ่มใดต่อไปนี้บ้าง (เลือกได้มากกว่า 1 ข้อ)',
      type: 'checkbox',
      choice: [
        {
          label: 'เงินฝากธนาคาร',
          select: true,
        }, {
          label: 'พันธบัตรรัฐบาล หรือกองทุนรวมพันธบัตรรัฐบาล',
          select: false,
        }, {
          label: 'หุ้นกู้ หรือกองทุนรวมตราสารหนี้',
          select: true,
        }, {
          label: 'หุ้นสามัญ หรือกองทุนรวมหุ้น หรือสินทรัพย์อื่นที่มีความเสี่ยงสูง',
          select: false,
        }
      ],
    }, {
      title: 'ท่านคาดว่าจะไม่มีความจำเป็นต้องใช้เงินลงทุนนี้นานแค่ไหน',
      choice: ['ไม่เกิน 1 ปี', '1 – 3 ปี', '3 – 5 ปี', 'มากกว่า 5 ปี'],
    }, {
      title: 'เมื่อพิจารณารูปแสดงตัวอย่างผลตอบแทนของกลุ่มการลงทุนที่อาจเกิดขึ้นด้านล่าง ท่านเต็มใจที่จะลงทุนในแบบใด',
      choice: [
        'แบบที่ 1 มีโอกาสได้รับผลตอบแทนสูงสุด 2.5% โดยไม่ขาดทุนเลย',
        'แบบที่ 2 มีโอกาสได้รับผลตอบแทนสูงสุด 7% แต่อาจขาดทุนได้ถึง 1%',
        'แบบที่ 3 มีโอกาสได้รับผลตอบแทนสูงสุด 15% แต่อาจขาดทุนได้ถึง 5%',
        'แบบที่ 4 มีโอกาสได้รับผลตอบแทนสูงสุด 25% แต่อาจขาดทุนได้ถึง 15%',
      ],
    }, {
      title: 'ถ้าท่านเลือกลงทุนในทรัพย์สินที่มีโอกาสได้รับผลตอบแทนมาก แต่มีโอกาสขาดทุนสูงด้วยเช่นกัน ท่านจะรู้สึกอย่างไร',
      choice: [
        'กังวลและตื่นตระหนกกลัวขาดทุน',
        'ไม่สบายใจแต่พอเข้าใจได้บ้าง',
        'เข้าใจและรับความผันผวนได้ในระดับหนึ่ง',
        'ไม่กังวลกับโอกาสขาดทุนสูง และหวังกับผลตอบแทนที่อาจจะได้รับสูงขึ้น'
      ],
    }, {
      title: 'ท่านจะรู้สึกกังวล/รับไม่ได้ เมื่อมูลค่าเงินลงทุนของท่านมีการปรับตัวลดลงในสัดส่วนเท่าใด',
      choice: [
        '5% หรือน้อยกว่า',
        'มากกว่า 5% - 10%',
        'มากกว่า 10% - 20%',
        'มากกว่า 20% ขึ้นไป',
      ],
    }, {
      title: 'หากปีที่แล้วท่านลงทุนไป 100,000 บาท ปีนี้ท่านพบว่ามูลค่าเงินลงทุนลดลงเหลือ 85,000 บาท ท่านจะทำอย่างไร',
      choice: [
        'ตกใจ และต้องการขายการลงทุนที่เหลือทิ้ง ',
        'กังวลใจ และจะปรับเปลี่ยนการลงทุนบางส่วนไปในทรัพย์สินที่เสี่ยงน้อยลง',
        'อดทนถือต่อเพื่อรอผลตอบแทนปรับตัวกลับมา',
        'ไม่กังวลใจ เพราะเข้าใจในการลงทุนระยะยาวและอาจเพิ่มเงินลงทุนในแบบเดิมเพื่อเฉลี่ยต้นทุน',
      ],
    }, {
      title: 'หากการลงทุนในอนุพันธ์และหุ้นกู้อนุพันธ์ประสบความสำเร็จ ท่านจะได้รับผลตอบแทนในอัตราที่สูงมาก แต่หากการลงทุนล้มเหลว ท่านอาจจะสูญเงินลงทุนทั้งหมด และอาจต้องลงเงินชดเชยเพิ่มบางส่วน ท่านยอมรับได้เพียงใด',
      choice: [
        'ไม่ได้',
        'ได้บ้าง',
        'ได้',
      ]
    }, {
      title: 'นอกเหนือจากความเสี่ยงในการลงทุนแล้ว ท่านสามารถรับความเสี่ยงด้านอัตราแลกเปลี่ยนในกรณีที่ลงทุนในกองทุนรวมที่มีนโยบายลงทุนในต่างประเทศตั้งแต่ร้อยละ 20 ของมูลค่าทรัพย์สินสุทธิ (NAV) ขึ้นไป ได้เพียงใด',
      choice: [
        'ไม่ได้',
        'ได้บ้าง',
        'ได้'
      ]
    }
  ]
}

export default (state = init, action) => {
  switch (action.type) {
    case CHANGE_SUITTEST:
      return { ...state, [action.key]: action.value }
  
    default:
      return state
  }
}