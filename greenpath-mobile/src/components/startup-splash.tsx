import { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Easing,
    Image,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const background = require('../../assets/images/splash-background.png');
const imageSize = Image.resolveAssetSource(background);

type StartupSplashProps = {
    onFinish: () => void;
};

export default function StartupSplash({
    onFinish,
}: StartupSplashProps) {
    const progress = useRef(new Animated.Value(0)).current;
    const [imageReady, setImageReady] = useState(false);
    const { width, height } = useWindowDimensions();

    // Fit the complete design to the screen without stretching it.
    const scale = Math.min(
        width / imageSize.width,
        height / imageSize.height,
    );

    const artworkWidth = imageSize.width * scale;
    const artworkHeight = imageSize.height * scale;
    const barWidth = artworkWidth * 0.33;

    useEffect(() => {
        if (!imageReady) {
            return;
        }

        progress.setValue(0);

        const animation = Animated.sequence([
            Animated.timing(progress, {
                toValue: 1,
                duration: 2500,
                easing: Easing.inOut(Easing.cubic),
                useNativeDriver: true,
            }),
            Animated.delay(200),
        ]);

        animation.start(({ finished }) => {
            if (finished) {
                onFinish();
            }
        });

        return () => {
            animation.stop();
        };
    }, [imageReady, onFinish, progress]);

    const translateX = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [-barWidth, 0],
    });

    return (
        <View style={styles.screen}>
            <StatusBar style="light" />

            <View
                style={{
                    width: artworkWidth,
                    height: artworkHeight,
                }}
            >
                <Image
                    source={background}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: artworkWidth,
                        height: artworkHeight,
                    }}
                    resizeMode="contain"
                    onLoad={() => setImageReady(true)}
                    onError={onFinish}
                    accessible={false}
                />
                <View
                    style={styles.loadingArea}
                    accessible
                    accessibilityLabel="Starting Eco Commute"
                >
                    <View style={[styles.track, { width: barWidth }]}>
                        <Animated.View
                            style={[
                                styles.fill,
                                {
                                    width: barWidth,
                                    transform: [{ translateX }],
                                },
                            ]}
                        />
                    </View>

                    <Text style={styles.loadingText}>
                        GETTING YOUR JOURNEY READY
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#00443E',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingArea: {
        position: 'absolute',
        top: '88%',
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    track: {
        height: 5,
        borderRadius: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
        borderRadius: 3,
        backgroundColor: '#9AFF00',
    },
    loadingText: {
        marginTop: 18,
        paddingHorizontal: 16,
        fontSize: 10,
        letterSpacing: 0.5,
        color: '#C7E6D9',
        textAlign: 'center',
    },
});