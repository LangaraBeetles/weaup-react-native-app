//
//  CMHeadphoneMotionManager.swift
//  beetlesmobile
//
//  Created by Wonnyo Hamester on 2024-05-23.
//

import Foundation
import CoreMotion

//@available(iOS 14.0, *)
@objc(HeadphoneMotionManager)
class HeadphoneMotionManager: NSObject {
    private let motionManager = CMHeadphoneMotionManager()

    @objc func startUpdates() {
        guard motionManager.isDeviceMotionAvailable else {
            print("Headphone motion is not available")
            return
        }

        motionManager.startDeviceMotionUpdates(to: OperationQueue.main) { (motion, error) in
            guard let motion = motion else {
                print("Error: \(String(describing: error))")
                return
            }
            print("Motion: \(motion)")
            // Send motion data to JavaScript if needed
        }
    }

    @objc func stopUpdates() {
        motionManager.stopDeviceMotionUpdates()
    }
}
