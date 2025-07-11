import Foundation
import AudioToolbox

@objc(VibrateFight) class VibrateFight: CDVPlugin {
    @objc(vibrateNow:)
    func vibrateNow(command: CDVInvokedUrlCommand) {
        AudioServicesPlaySystemSound(SystemSoundID(kSystemSoundID_Vibrate))
        let pluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: "Vibrated")
        self.commandDelegate.send(pluginResult, callbackId: command.callbackId)
    }
}
