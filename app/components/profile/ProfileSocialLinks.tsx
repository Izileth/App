import { Pressable, Text, View, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

type SocialLinksProps = {
    profile: {
        website_url?: string | null;
        github_handle?: string | null;
        twitter_handle?: string | null;
    };
    isOwner?: boolean;
    onEdit?: () => void;
};

export function ProfileSocialLinks({ profile, isOwner, onEdit }: SocialLinksProps) {
    const socialLinks = [
        {
            url: profile.website_url,
            label: 'Website',
            icon: 'globe',
            color: '#ffffff',
            bgColor: 'bg-black',
            borderColor: 'border-zinc-900',
        },
        {
            url: profile.github_handle,
            label: 'GitHub',
            icon: 'github',
            color: '#ffffff',
            bgColor: 'bg-black',
            borderColor: 'border-zinc-900',
        },
        {
            url: profile.twitter_handle,
            label: 'Twitter',
            icon: 'twitter',
            color: '#ffffff',
            bgColor: 'bg-black',
            borderColor: 'border-zinc-900',
        },
    ].filter(link => link.url); // Remove links vazios

    // Se não tem nenhum link, não mostra nada (nem título)
    if (socialLinks.length === 0) {
        return null;
    }

    const handleLinkPress = async (url: string) => {
        try {
            const canOpen = await Linking.canOpenURL(url);
            if (canOpen) {
                await Linking.openURL(url);
            }
        } catch (error) {
            console.error('Error opening link:', error);
        }
    };

    return (
        <View className="bg-black rounded-xl p-4 mb-4">
            <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center">
                    <View className="w-1 h-4 bg-red-600 rounded-full mr-2" />
                    <Text className="text-red-500 font-bold text-sm tracking-wider">REDES SOCIAIS</Text>
                </View>
                {isOwner && onEdit && (
                    <Pressable onPress={onEdit} className="active:opacity-70 p-1">
                        <FontAwesome name="pencil" size={14} color="#737373" />
                    </Pressable>
                )}
            </View>
            <View className="flex-row w-full max-w-full justify-between items-center flex-wrap gap-2">
                {socialLinks.map((link, index) => (
                    <Pressable
                        key={index}
                        onPress={() => handleLinkPress(link.url!)}
                        className="active:opacity-70 active:scale-95"
                    >
                        <View className={`${link.bgColor} border ${link.borderColor} rounded-lg px-4 py-3 flex-row items-center min-w-[140px]`}>
                            <View className="mr-3">
                                <FontAwesome name={link.icon as any} size={18} color={link.color} />
                            </View>
                            <View className="flex-1">
                                <Text className="text-neutral-400 text-xs font-semibold mb-0.5">
                                    {link.label.toUpperCase()}
                                </Text>
                                <View className="flex-row items-center">
                                    <Text className="text-white text-sm font-bold">
                                        Visitar
                                    </Text>
                                    <FontAwesome name="external-link" size={10} color="#737373" style={{ marginLeft: 6 }} />
                                </View>
                            </View>
                        </View>
                    </Pressable>
                ))}
            </View>
        </View>
    );
}