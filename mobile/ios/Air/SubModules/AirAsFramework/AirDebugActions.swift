import UIKit
import UIAgent
import UIComponents
import UIHome
import WalletContext

@MainActor
public enum AirDebugActions {
    public static func resetAgentConsentState() {
        AgentEntryPoint.resetConsentStateForDebug()
        resetAgentRoot()
    }

    private static func resetAgentRoot() {
        for window in UIApplication.shared.sceneWindows {
            window.rootViewController?
                .descendantViewController(of: HomeTabBarController.self)?
                .debugOnly_resetAgentRoot()
            window.rootViewController?
                .descendantViewController(of: SplitRootViewController.self)?
                .debugOnly_resetAgentRoot()
        }
    }
}
