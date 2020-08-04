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
    playerNameLabel: cc.Label
    pchoice = 0
    cChoice = 0

    @property(cc.Node)
    confirmBtn: cc.Node

    // Choices Player
    @property(cc.Node)
    prock: cc.Node
    @property(cc.Node)
    pscissor: cc.Node
    @property(cc.Node)
    ppaper: cc.Node

    // Choices Com
    @property(cc.Node)
    crock: cc.Node
    @property(cc.Node)
    cscissor: cc.Node
    @property(cc.Node)
    cpaper: cc.Node

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        var playerName = localStorage.getItem('pname')
        this.playerNameLabel.string = playerName
        this.confirmBtn.active = false
        this.crock.active = false
        this.cscissor.active = false
        this.cpaper.active = false
    }

    playerChoose(e, choice: number) {
        this.pchoice = choice
        this.confirmBtn.active = true
    }

    comChoice() {
        this.cChoice = Math.floor(Math.random() * 3)
        console.log('com: ' + this.cChoice);

        this.checkComChoice(this.cChoice)


    }

    checkComChoice(c: number) {
        if (c == 0) {
            this.crock.active = true
            this.cscissor.active = false
            this.cpaper.active = false
        } else if (c == 1) {
            this.crock.active = false
            this.cscissor.active = true
            this.cpaper.active = false
        } else if (c == 2) {
            this.crock.active = false
            this.cscissor.active = false
            this.cpaper.active = true
        }
    }

    checkResult() {
        var p = this.pchoice
        var c = this.cChoice

        if (p == 0 && c == 0) {
            console.log('draw');
        } else if (p == 0 && c == 1) {
            console.log('player win');
        } else if (p == 0 && c == 2) {
            console.log('com win');
        } else if (p ==  1 && c == 0) {
            console.log('com win');
        }else if (p ==  1 && c == 1) {
            console.log('draw');
        }else if (p ==  1 && c == 2) {
            console.log('player win');
        }else if (p ==  2 && c == 0) {
            console.log('player win');
        }else if (p ==  2 && c == 1) {
            console.log('com win');
        }else if (p ==  2 && c == 2) {
            console.log('draw');
        }

        this.confirmBtn.active = false
    }

    onClickConfirmBtn() {
        this.comChoice()
        console.log('cchoice: ' + this.cChoice);
        console.log('pchoice: ' + this.pchoice);
        this.checkResult()
    }

    start() {

    }

    // update (dt) {}
}
