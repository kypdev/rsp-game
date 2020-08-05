// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Node)
  playerName: cc.Node;
  @property(cc.Node)
  alertVal: cc.Node;
  @property(cc.Node)
  alertBtn: cc.Node;

  savePlayerName() {
    var pname = this.playerName
      .getChildByName("edbPlayerName")
      .getComponent(cc.Label).string;
    console.log(pname);

    const regex = /^[a-zA-Z0-9]+$/;

    if (pname.match(regex)) {
      console.log("val ok");
      localStorage.setItem("pname", pname);
      cc.director.loadScene("Second");
    } else {
      console.log("val failed");
      this.alertVal.active = true;
      
    }
  }

  onClickAlertBtn() {
    this.alertVal.active = false;
  }

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {}

  // update (dt) {}
}
