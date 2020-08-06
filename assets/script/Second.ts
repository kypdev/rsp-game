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

  @property(cc.Node)
  cr1: cc.Node;
  @property(cc.Node)
  cs1: cc.Node;
  @property(cc.Node)
  cp1: cc.Node;

  @property(cc.Node)
  cr2: cc.Node;
  @property(cc.Node)
  cs2: cc.Node;
  @property(cc.Node)
  cp2: cc.Node;

  @property(cc.Node)
  cr3: cc.Node;
  @property(cc.Node)
  cs3: cc.Node;
  @property(cc.Node)
  cp3: cc.Node;

  @property(cc.Node)
  cr4: cc.Node;
  @property(cc.Node)
  cs4: cc.Node;
  @property(cc.Node)
  cp4: cc.Node;

  @property(cc.Node)
  cr5: cc.Node;
  @property(cc.Node)
  cs5: cc.Node;
  @property(cc.Node)
  cp5: cc.Node;

  @property(cc.Node)
  pr1: cc.Node;
  @property(cc.Node)
  ps1: cc.Node;
  @property(cc.Node)
  pp1: cc.Node;

  @property(cc.Node)
  pr2: cc.Node;
  @property(cc.Node)
  ps2: cc.Node;
  @property(cc.Node)
  pp2: cc.Node;

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

  showComHis() {
    console.log(this.comHistory.length);
    

    // Round1
    if (this.comHistory[0] == 0) {
      this.cr1.active = true;
      this.cs1.active = false;
      this.cp1.active = false;
    } else if (this.comHistory[0] == 1) {
      this.cr1.active = false;
      this.cs1.active = true;
      this.cp1.active = false;
    } else if (this.comHistory[0] == 2) {
      this.cr1.active = false;
      this.cs1.active = false;
      this.cp1.active = true;
    }

    // Round2
    if (this.comHistory[1] == 0) {
      this.cr2.active = true;
      this.cs2.active = false;
      this.cp2.active = false;
    } else if (this.comHistory[1] == 1) {
      this.cr2.active = false;
      this.cs2.active = true;
      this.cp2.active = false;
    } else if (this.comHistory[1] == 2) {
      this.cr2.active = false;
      this.cs2.active = false;
      this.cp2.active = true;
    }

    // Round3
    if (this.comHistory[2] == 0) {
      this.cr3.active = true;
      this.cs3.active = false;
      this.cp3.active = false;
    } else if (this.comHistory[2] == 1) {
      this.cr3.active = false;
      this.cs3.active = true;
      this.cp3.active = false;
    } else if (this.comHistory[2] == 2) {
      this.cr3.active = false;
      this.cs3.active = false;
      this.cp3.active = true;
    }

    // Round4
    if (this.comHistory[3] == 0) {
      this.cr4.active = true;
      this.cs4.active = false;
      this.cp4.active = false;
    } else if (this.comHistory[3] == 1) {
      this.cr4.active = false;
      this.cs4.active = true;
      this.cp4.active = false;
    } else if (this.comHistory[3] == 2) {
      this.cr4.active = false;
      this.cs4.active = false;
      this.cp4.active = true;
    }

    // Round5
    if (this.comHistory[4] == 0) {
      this.cr5.active = true;
      this.cs5.active = false;
      this.cp5.active = false;
    } else if (this.comHistory[4] == 1) {
      this.cr5.active = false;
      this.cs5.active = true;
      this.cp5.active = false;
    } else if (this.comHistory[4] == 2) {
      this.cr5.active = false;
      this.cs5.active = false;
      this.cp5.active = true;
    }
  }

  onClickConfirmBtn() {
    this.comChoice();
    this.win.active = false;
    this.lose.active = false;
    this.tie.active = false;
    this.checkResult();
    this.countRound++;
    this.showComHis();

    // Player 3 wins
    if (this.playerPoint >= 3) {
      this.onDisable();
      // this.playerNameLabel.enabled = true;
      this.resultBoard.active = true;
      // this.update("ชนะ");
      this.resultLabel.string = "ชนะ";
      this.pPoint.string = this.playerPoint.toString();
      this.cPoint.string = this.comPoint.toString();
      this.showComHis();
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
      this.showComHis();
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
    this.playerHistory = Array();
    this.comHistory = Array();
    this.countRound = 0;
    this.resultLabel.string = "";
    this.prock.active = true;
    this.pscissor.active = true;
    this.ppaper.active = true;
    this.cr2.active = false;
    this.cs2.active = false;
    this.cp2.active = false;
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
