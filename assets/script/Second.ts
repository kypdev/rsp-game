// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Label)
  playerNameLabel: cc.Label;
  pchoice: number;
  cChoice: number;
  playerPoint: number;
  comPoint: number;
  playerHistory: Array<number>;
  comHistory: Array<number>;
  countRound: number;

  @property(cc.Label)
  resultLabel: cc.Label;
  @property(cc.Label)
  pPoint: cc.Label;
  @property(cc.Label)
  cPoint: cc.Label;
  @property(cc.Node)
  resultBoard: cc.Node;
  @property(cc.Node)
  confirmBtn: cc.Node;
  @property(cc.Node)
  playAgainBtn: cc.Node;
  @property(cc.Node)
  exitBtn: cc.Node;

  // Play result    @property(cc.Node)
  @property(cc.Node)
  lose: cc.Node;
  @property(cc.Node)
  win: cc.Node;
  @property(cc.Node)
  tie: cc.Node;

  // Choices Player
  @property(cc.Node)
  prock: cc.Node;
  @property(cc.Node)
  pscissor: cc.Node;
  @property(cc.Node)
  ppaper: cc.Node;

  // Choices Com
  @property(cc.Node)
  crock: cc.Node;
  @property(cc.Node)
  cscissor: cc.Node;
  @property(cc.Node)
  cpaper: cc.Node;

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    var playerName = localStorage.getItem("pname");
    this.playerNameLabel.string = playerName;
    this.confirmBtn.active = false;
    this.crock.active = false;
    this.cscissor.active = false;
    this.cpaper.active = false;
    this.win.active = false;
    this.lose.active = false;
    this.tie.active = false;
  }

  playerChoose(e, choice: number) {
    this.pchoice = choice;
    this.confirmBtn.active = true;
  }

  comChoice() {
    this.cChoice = Math.floor(Math.random() * 3);
    // this.cChoice = 0;
    // console.log("com: " + this.cChoice);

    this.checkComChoice(this.cChoice);
  }

  checkComChoice(c: number) {
    if (c == 0) {
      this.crock.active = true;
      this.cscissor.active = false;
      this.cpaper.active = false;
    } else if (c == 1) {
      this.crock.active = false;
      this.cscissor.active = true;
      this.cpaper.active = false;
    } else if (c == 2) {
      this.crock.active = false;
      this.cscissor.active = false;
      this.cpaper.active = true;
    }
  }

  checkResult() {
    var p = this.pchoice;
    var c = this.cChoice;

    let i = 0;

    if (p == 0 && c == 0) {
      // console.log("tie");
      this.playerHistory.push(p);
      this.comHistory.push(c);
      this.tie.active = true;
    } else if (p == 0 && c == 1) {
      // console.log("player win");
      this.playerPoint++;
      this.playerHistory.push(p);
      this.comHistory.push(c);
      this.win.active = true;
    } else if (p == 0 && c == 2) {
      // console.log("com win");
      this.comPoint++;
      this.playerHistory.push(p);
      this.comHistory.push(c);
      this.lose.active = true;
    } else if (p == 1 && c == 0) {
      // console.log("com win");
      this.comPoint++;
      this.playerHistory.push(p);
      this.comHistory.push(c);
      this.lose.active = true;
    } else if (p == 1 && c == 1) {
      // console.log("tie");
      this.playerHistory.push(p);
      this.comHistory.push(c);
      this.tie.active = true;
    } else if (p == 1 && c == 2) {
      // console.log("player win");
      this.playerPoint++;
      this.playerHistory.push(p);
      this.comHistory.push(c);
      this.win.active = true;
    } else if (p == 2 && c == 0) {
      // console.log("player win");
      this.playerPoint++;
      this.playerHistory.push(p);
      this.comHistory.push(c);
      this.win.active = true;
    } else if (p == 2 && c == 1) {
      // console.log("com win");
      this.comPoint++;
      this.playerHistory.push(p);
      this.comHistory.push(c);
      this.lose.active = true;
    } else if (p == 2 && c == 2) {
      // console.log("tie");
      this.playerHistory.push(p);
      this.comHistory.push(c);
      this.tie.active = true;
    }

    this.confirmBtn.active = false;
    console.log("ppoint: " + this.playerPoint);
    console.log("cpoint: " + this.comPoint);
    console.log("phis: " + this.playerHistory);
    console.log("chis: " + this.comHistory);
  }

  onClickConfirmBtn() {
    this.comChoice();
    this.win.active = false;
    this.lose.active = false;
    this.tie.active = false;
    this.checkResult();
    this.countRound++;

    // Player 3 wins
    if (this.playerPoint >= 3) {
      this.onDisable();
      // this.playerNameLabel.enabled = true;
      this.resultBoard.active = true;
      // this.update("ชนะ");
      this.resultLabel.string = "ชนะ";
      this.pPoint.string = this.playerPoint.toString();
      this.cPoint.string = this.comPoint.toString();
      console.log("PLAYER WINNER");
      console.log("PPOINT: " + this.playerPoint);
      console.log("CPOINT: " + this.comPoint);
      console.log("PLAYER RESULT: " + this.playerHistory);
      console.log("COM RESULT: " + this.comHistory);
    }

    // Com 3 wins
    if (this.comPoint >= 3) {
      this.onDisable();
      // this.playerNameLabel.enabled = true;
      this.resultBoard.active = true;
      // this.update("แพ้");
      this.resultLabel.string = "แพ้";
      this.pPoint.string = this.playerPoint.toString();
      this.cPoint.string = this.comPoint.toString();
      console.log("COM WINNER");
      console.log("PLAYER RESULT: " + this.playerHistory);
      console.log("COM RESULT: " + this.comHistory);
    }

    if (this.countRound == 5) {
      // this.onDisable();
      if (this.playerPoint > this.comPoint) {
        this.onDisable();
        // this.playerNameLabel.enabled = true;
        this.resultBoard.active = true;
        // this.update("ฃนะ");
        this.resultLabel.string = "ชนะ";
        this.pPoint.string = this.playerPoint.toString();
        this.cPoint.string = this.comPoint.toString();

        console.log("PLAYER WIN");
        console.log("PLAYER RESULT: " + this.playerHistory);
        console.log("COM RESULT: " + this.comHistory);
      } else if (this.playerPoint < this.comPoint) {
        this.onDisable();
        // this.playerNameLabel.enabled = true;

        this.resultBoard.active = true;
        // this.update("แพ้");
        this.resultLabel.string = "แพ้";
        this.pPoint.string = this.playerPoint.toString();
        this.cPoint.string = this.comPoint.toString();
        console.log("COM WIN");
        console.log("PLAYER RESULT: " + this.playerHistory);
        console.log("COM RESULT: " + this.comHistory);
      } else if (this.playerPoint == this.comPoint) {
        this.onDisable();
        // this.playerNameLabel.enabled = true;
        this.resultBoard.active = true;
        // this.update("เสมอ");
        this.resultLabel.string = "เสมอ";
        this.pPoint.string = this.playerPoint.toString();
        this.cPoint.string = this.comPoint.toString();
        console.log("TIE");
        console.log("PLAYER RESULT: " + this.playerHistory);
        console.log("COM RESULT: " + this.comHistory);
      }
    }
  }

  onClickPlayAgain() {
    this.start();
  }

  onClickExitBtn() {
    cc.director.loadScene("Playername");
  }

  start() {
    this.playerNameLabel.enabled = true;
    this.resultBoard.active = false;
    this.resultLabel.enabled = true;
    this.pchoice = 0;
    this.cChoice = 0;
    this.playerPoint = 0;
    this.comPoint = 0;
    this.playerHistory = [];
    this.comHistory = [];
    this.countRound = 0;
    this.resultLabel.string = "";
    this.prock.active = true;
    this.pscissor.active = true;
    this.ppaper.active = true;
  }

  // update (dt) {}

  onDisable() {
    this.confirmBtn.active = false;
    this.ppaper.active = false;
    this.prock.active = false;
    this.pscissor.active = false;
    this.cpaper.active = false;
    this.crock.active = false;
    this.cscissor.active = false;
    this.win.active = false;
    this.lose.active = false;
    this.tie.active = false;
  }

  // update(label){
  //   this.resultLabel.string = label
  // }
}
