import Foundation
import UserNotifications

@objc(Echo) class Echo : CDVPlugin {
    
    // MARK: - Initialization
    override func pluginInitialize() {
        super.pluginInitialize()
        UNUserNotificationCenter.current().delegate = self
        print("✅ Notification delegate set")
    }
    
    // MARK: - Echo Plugin Method
    @objc(echo:) func echo(command: CDVInvokedUrlCommand) {
        let msg = command.arguments[0] as? String ?? ""
        
        if !msg.isEmpty {
            sendPluginSuccess(successMessage: msg, callbackId: command.callbackId)
        } else {
            sendPluginError(errorMessage: "Empty message was passed", callbackId: command.callbackId)
        }
    }
    
    // MARK: - Notification Methods
    @objc(showNotification:) func showNotification(command: CDVInvokedUrlCommand) {
        print("🔔 showNotification called with args: \(command.arguments)")
        
        guard command.arguments.count >= 2 else {
            sendPluginError(errorMessage: "Need title and message arguments", callbackId: command.callbackId)
            return
        }
        
        let title = command.arguments[0] as? String ?? "Notification Title"
        let message = command.arguments[1] as? String ?? "Notification Message"
        
        print("🔔 Preparing notification: '\(title)' - '\(message)'")
        
        let center = UNUserNotificationCenter.current()
        
        center.getNotificationSettings { settings in
            print("🔔 Current notification settings: \(settings)")
            
            DispatchQueue.main.async {
                switch settings.authorizationStatus {
                case .authorized, .provisional:
                    print("🔔 Already authorized, sending notification")
                    self.sendLocalNotification(title: title, message: message, callbackContext: command.callbackId)
                    
                case .notDetermined:
                    print("🔔 Requesting notification permission")
                    center.requestAuthorization(options: [.alert, .sound, .badge]) { granted, error in
                        print("🔔 Permission result - granted: \(granted), error: \(error?.localizedDescription ?? "nil")")
                        DispatchQueue.main.async {
                            if granted {
                                self.sendLocalNotification(title: title, message: message, callbackContext: command.callbackId)
                            } else {
                                self.sendPluginError(
                                    errorMessage: error?.localizedDescription ?? "Notification permission not granted",
                                    callbackId: command.callbackId
                                )
                            }
                        }
                    }
                    
                case .denied:
                    print("🔔 Notifications denied by user")
                    self.sendPluginError(
                        errorMessage: "Notifications blocked. Please enable in Settings.",
                        callbackId: command.callbackId
                    )
                    
                @unknown default:
                    print("🔔 Unknown authorization status")
                    self.sendPluginError(
                        errorMessage: "Unknown notification status",
                        callbackId: command.callbackId
                    )
                }
            }
        }
    }
    
    private func sendLocalNotification(title: String, message: String, callbackContext: String) {
        let content = UNMutableNotificationContent()
        content.title = title
        content.body = message
        content.sound = .default
        content.badge = 1
        
        let identifier = "local-\(Date().timeIntervalSince1970)"
        let trigger = UNTimeIntervalNotificationTrigger(timeInterval: 1, repeats: false)
        let request = UNNotificationRequest(identifier: identifier, content: content, trigger: trigger)
        
        UNUserNotificationCenter.current().add(request) { error in
            if let error = error {
                print("❌ Failed to schedule notification: \(error.localizedDescription)")
                self.sendPluginError(
                    errorMessage: "Failed to show notification: \(error.localizedDescription)",
                    callbackId: callbackContext
                )
            } else {
                print("✅ Notification scheduled successfully! ID: \(identifier)")
                self.sendPluginSuccess(
                    successMessage: "Notification shown",
                    callbackId: callbackContext
                )
            }
        }
    }
    
    // MARK: - Helper Methods
    private func sendPluginSuccess(successMessage: String, callbackId: String) {
        let pluginResult = CDVPluginResult(status: CDVCommandStatus_OK, messageAs: successMessage)
        self.commandDelegate?.send(pluginResult, callbackId: callbackId)
    }
    
    private func sendPluginError(errorMessage: String, callbackId: String) {
        let pluginResult = CDVPluginResult(status: CDVCommandStatus_ERROR, messageAs: errorMessage)
        self.commandDelegate?.send(pluginResult, callbackId: callbackId)
    }
}

// MARK: - Notification Center Delegate
extension Echo: UNUserNotificationCenterDelegate {
    func userNotificationCenter(_ center: UNUserNotificationCenter,
                              willPresent notification: UNNotification,
                              withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
        print("📢 Handling foreground notification")
        completionHandler([.alert, .sound, .badge])
    }
    
    func userNotificationCenter(_ center: UNUserNotificationCenter,
                              didReceive response: UNNotificationResponse,
                              withCompletionHandler completionHandler: @escaping () -> Void) {
        print("📢 User interacted with notification")
        completionHandler()
    }
}